import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { RESTAURANT_STATUS } from '@pages/restaurants/constants/restaurant.constants';
import { useRestaurant } from '@pages/restaurants/hooks/useRestaurant';
import type { Restaurant } from '@pages/restaurants/types/restaurant.types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RestaurantDetailContainer } from './RestaurantDetailContainer';

import '@testing-library/jest-dom';

jest.mock('@pages/restaurants/hooks/useRestaurant', () => {
  return {
    useRestaurant: jest.fn(),
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

jest.mock('react-redux', () => {
  return {
    useSelector: jest.fn(),
  };
});

const mockUseRestaurant = jest.mocked(useRestaurant);
const mockUseSelector = jest.mocked(jest.requireMock('react-redux').useSelector);

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

const defaultHookMock = {
  createRestaurant: jest.fn(),
  deleteRestaurant: jest.fn(),
  error: null,
  fetchMore: jest.fn(),
  hasMore: false,
  isFetching: false,
  isLoading: false,
  items: [],
  restaurant: mockRestaurant,
  updateRestaurant: jest.fn(),
};

const mockAuthState = (userId: string | null) => {
  mockUseSelector.mockImplementation((selector: (state: unknown) => unknown) => {
    return selector({ auth: { user: userId ? { _id: userId } : null } });
  });
};

describe('RestaurantDetailContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRestaurant.mockReturnValue(defaultHookMock);
    mockAuthState('owner1');
  });

  it('should show a loading spinner while loading', () => {
    mockUseRestaurant.mockReturnValue({ ...defaultHookMock, isLoading: true });

    const { container } = render(<RestaurantDetailContainer />);

    expect(container.querySelector('.ant-spin')).toBeVisible();
  });

  it('should show an error message when the restaurant failed to load', () => {
    mockUseRestaurant.mockReturnValue({
      ...defaultHookMock,
      error: 'Something went wrong.',
      restaurant: null,
    });

    render(<RestaurantDetailContainer />);

    expect(screen.getByText('Something went wrong.')).toBeVisible();
  });

  it('should render the restaurant name and menu items section', () => {
    render(<RestaurantDetailContainer />);

    expect(screen.getByText('Tandoori Palace')).toBeVisible();
    expect(screen.getByTestId('menu-items-container')).toBeVisible();
  });

  it('should not render owner actions when the current user is not the owner', () => {
    mockAuthState('someone-else');

    render(<RestaurantDetailContainer />);

    expect(
      screen.queryByRole('button', { name: new RegExp(DISPLAY.ACTIONS.EDIT) }),
    ).not.toBeInTheDocument();
  });

  it('should open the restaurant form when Edit is clicked by the owner', async () => {
    const user = userEvent.setup();
    render(<RestaurantDetailContainer />);

    await user.click(screen.getByRole('button', { name: new RegExp(DISPLAY.ACTIONS.EDIT) }));

    expect(screen.getByText(DISPLAY.TITLES.EDIT_RESTAURANT)).toBeVisible();
  });

  it('should call navigate(-1) when Back is clicked', async () => {
    const user = userEvent.setup();
    render(<RestaurantDetailContainer />);

    await user.click(screen.getByRole('button', { name: new RegExp(DISPLAY.ACTIONS.BACK) }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
