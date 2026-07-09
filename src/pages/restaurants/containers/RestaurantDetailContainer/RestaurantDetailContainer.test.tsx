import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { RESTAURANT_STATUS } from '@pages/restaurants/constants/restaurant.constants';
import type { Restaurant } from '@pages/restaurants/types/restaurant.types';
import type { AuthUser } from '@services/auth/authService.types';
import { restaurantService } from '@services/restaurant/restaurantService';
import { renderWithStore } from '@test/utils/renderWithStore';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RestaurantDetailContainer } from './RestaurantDetailContainer';

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

jest.mock('@pages/restaurants/containers/MenuItemsContainer', () => {
  return {
    MenuItemsContainer: () => {
      return <div data-testid="menu-items-container" />;
    },
  };
});

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => {
      return mockNavigate;
    },
    useParams: () => {
      return { id: 'restaurant1' };
    },
  };
});

const mockGetById = jest.mocked(restaurantService.getById);

const mockOwner: AuthUser = {
  _id: 'owner1',
  email: 'owner@example.com',
  displayName: 'Owner',
  role: USER_ROLES.OWNER,
};

const mockRestaurant: Restaurant = {
  _id: 'restaurant1',
  ownerId: 'owner1',
  name: 'Tandoori Palace',
  description: 'Good food',
  cuisineTypes: ['indian'],
  rating: 0,
  status: RESTAURANT_STATUS.ACTIVE,
  openingTime: '09:00',
  closingTime: '22:00',
};

const renderWithAuthUser = (userId: string | null) => {
  return renderWithStore(<RestaurantDetailContainer />, {
    auth: {
      user: userId ? { ...mockOwner, _id: userId } : null,
      idToken: null,
      isLoading: false,
      isEmailVerified: false,
      isFirebaseInitializing: false,
      error: null,
    },
  });
};

describe('RestaurantDetailContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show a loading spinner while loading', () => {
    mockGetById.mockReturnValue(new Promise(() => {}));

    const { container } = renderWithAuthUser('owner1');

    expect(container.querySelector('.ant-spin')).toBeVisible();
  });

  it('should show an error message when the restaurant failed to load', async () => {
    mockGetById.mockRejectedValue(new Error('Something went wrong.'));

    renderWithAuthUser('owner1');

    expect(await screen.findByText('Something went wrong.')).toBeVisible();
  });

  it('should render the restaurant name and menu items section', async () => {
    mockGetById.mockResolvedValue(mockRestaurant);

    renderWithAuthUser('owner1');

    expect(await screen.findByText('Tandoori Palace')).toBeVisible();
    expect(screen.getByTestId('menu-items-container')).toBeVisible();
  });

  it('should not render owner actions when the current user is not the owner', async () => {
    mockGetById.mockResolvedValue(mockRestaurant);

    renderWithAuthUser('someone-else');

    expect(await screen.findByText('Tandoori Palace')).toBeVisible();
    expect(
      screen.queryByRole('button', { name: new RegExp(DISPLAY.ACTIONS.EDIT) }),
    ).not.toBeInTheDocument();
  });

  it('should open the restaurant form when Edit is clicked by the owner', async () => {
    mockGetById.mockResolvedValue(mockRestaurant);
    const user = userEvent.setup();

    renderWithAuthUser('owner1');
    await user.click(await screen.findByRole('button', { name: new RegExp(DISPLAY.ACTIONS.EDIT) }));

    expect(screen.getByRole('dialog', { name: DISPLAY.TITLES.EDIT_RESTAURANT })).toBeVisible();
  });

  it('should call navigate(-1) when Back is clicked', async () => {
    mockGetById.mockResolvedValue(mockRestaurant);
    const user = userEvent.setup();

    renderWithAuthUser('owner1');
    await user.click(await screen.findByRole('button', { name: new RegExp(DISPLAY.ACTIONS.BACK) }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
