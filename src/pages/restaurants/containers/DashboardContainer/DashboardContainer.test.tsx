import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { useRestaurant } from '@pages/restaurants/hooks/useRestaurant';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DashboardContainer } from './DashboardContainer';

import '@testing-library/jest-dom';

jest.mock('@pages/restaurants/hooks/useRestaurant', () => {
  return {
    useRestaurant: jest.fn(),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => {
      return jest.fn();
    },
  };
});

const mockUseRestaurant = jest.mocked(useRestaurant);

const defaultMock = {
  createRestaurant: jest.fn(),
  deleteRestaurant: jest.fn(),
  error: null,
  fetchMore: jest.fn(),
  hasMore: false,
  isFetching: false,
  isLoading: false,
  items: [],
  restaurant: null,
  updateRestaurant: jest.fn(),
};

describe('DashboardContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRestaurant.mockReturnValue(defaultMock);
    global.IntersectionObserver = jest.fn().mockImplementation(() => {
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
      };
    });
  });

  it('should render the page title', () => {
    render(<DashboardContainer />);

    expect(screen.getByText(DISPLAY.TITLES.DASHBOARD)).toBeVisible();
  });

  it('should render the Add Restaurant button', () => {
    render(<DashboardContainer />);

    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_RESTAURANT })).toBeVisible();
  });

  it('should show the empty state when there are no restaurants', () => {
    render(<DashboardContainer />);

    expect(screen.getByText(DISPLAY.EMPTY.NO_OWNED_RESTAURANTS)).toBeVisible();
  });

  it('should open the restaurant form when Add Restaurant is clicked', async () => {
    const user = userEvent.setup();

    render(<DashboardContainer />);
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_RESTAURANT }));

    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE })).toBeVisible();
  });
});
