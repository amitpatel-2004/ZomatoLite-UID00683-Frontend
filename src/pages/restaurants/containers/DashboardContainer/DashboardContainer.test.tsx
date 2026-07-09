import { HTTP_STATUS } from '@constants/api.constants';
import { ApiError } from '@core/api/apiError';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { RESTAURANT_STATUS } from '@pages/restaurants/constants/restaurant.constants';
import type { Restaurant } from '@pages/restaurants/types/restaurant.types';
import { restaurantService } from '@services/restaurant/restaurantService';
import { renderWithStore } from '@test/utils/renderWithStore';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DashboardContainer } from './DashboardContainer';

import '@testing-library/jest-dom';

jest.mock('@services/restaurant/restaurantService', () => {
  return {
    restaurantService: {
      listMine: jest.fn(),
      getById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
});

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => {
      return jest.fn();
    },
  };
});

const mockListMine = jest.mocked(restaurantService.listMine);
const mockCreate = jest.mocked(restaurantService.create);

const mockRestaurant: Restaurant = {
  _id: 'restaurant1',
  ownerId: 'owner1',
  name: 'Tandoori Palace',
  description: '',
  cuisineTypes: ['indian'],
  rating: 0,
  status: RESTAURANT_STATUS.ACTIVE,
  openingTime: '09:30',
  closingTime: '22:00',
};

const fillRestaurantForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByRole('textbox', { name: DISPLAY.LABELS.NAME }), 'Tandoori Palace');
  await user.click(screen.getByRole('combobox'));
  await user.click(screen.getByText('Indian'));

  const openingTime = document.querySelector('input[name="openingTime"]') as HTMLInputElement;
  const closingTime = document.querySelector('input[name="closingTime"]') as HTMLInputElement;
  await user.type(openingTime, '0930');
  await user.type(closingTime, '2200');
};

global.IntersectionObserver = jest.fn().mockImplementation(() => {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
});

describe('DashboardContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockListMine.mockResolvedValue({ items: [], hasMore: false, nextCursor: null });
  });

  it('should render the page title, Add Restaurant button and empty state', async () => {
    renderWithStore(<DashboardContainer />);

    expect(screen.getByText(DISPLAY.TITLES.DASHBOARD)).toBeVisible();
    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_RESTAURANT })).toBeVisible();
    expect(await screen.findByText(DISPLAY.EMPTY.NO_RESTAURANTS)).toBeVisible();
  });

  it('should open the restaurant form when Add Restaurant is clicked', async () => {
    const user = userEvent.setup();

    renderWithStore(<DashboardContainer />);
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_RESTAURANT }));

    expect(screen.getByRole('dialog', { name: DISPLAY.TITLES.CREATE_RESTAURANT })).toBeVisible();
    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE })).toBeVisible();
  });

  it('should create the restaurant, show a success message and close the form', async () => {
    mockCreate.mockResolvedValue(mockRestaurant);
    const user = userEvent.setup();

    renderWithStore(<DashboardContainer />);
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_RESTAURANT }));
    await fillRestaurantForm(user);
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE }));

    expect(await screen.findByText(MESSAGES.SUCCESS.RESTAURANT_CREATED)).toBeVisible();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('Tandoori Palace')).toBeVisible();
  });

  it('should show an error message and keep the form open when creation fails', async () => {
    mockCreate.mockRejectedValue(new Error('Network error.'));
    const user = userEvent.setup();

    renderWithStore(<DashboardContainer />);
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_RESTAURANT }));
    await fillRestaurantForm(user);
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE }));

    expect(await screen.findByText('Network error.')).toBeVisible();
    expect(screen.getByRole('dialog', { name: DISPLAY.TITLES.CREATE_RESTAURANT })).toBeVisible();
  });

  it('should show the duplicate name error when creation conflicts', async () => {
    mockCreate.mockRejectedValue(
      new ApiError('A restaurant with this name already exists.', HTTP_STATUS.CONFLICT),
    );
    const user = userEvent.setup();

    renderWithStore(<DashboardContainer />);
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_RESTAURANT }));
    await fillRestaurantForm(user);
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE }));

    expect(await screen.findByText('A restaurant with this name already exists.')).toBeVisible();
    expect(screen.getByRole('dialog', { name: DISPLAY.TITLES.CREATE_RESTAURANT })).toBeVisible();
  });
});
