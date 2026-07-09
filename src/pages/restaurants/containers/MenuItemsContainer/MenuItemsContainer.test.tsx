import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { useMenuItems } from '@pages/restaurants/hooks/useMenuItems';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MenuItemsContainer } from './MenuItemsContainer';

import '@testing-library/jest-dom';

jest.mock('@pages/restaurants/hooks/useMenuItems', () => {
  return {
    useMenuItems: jest.fn(),
  };
});

jest.mock('@services/menuItem/menuItemService', () => {
  return {
    menuItemService: {
      getUploadUrl: jest.fn(),
      uploadImage: jest.fn(),
    },
  };
});

const mockUseMenuItems = jest.mocked(useMenuItems);

const defaultMock = {
  createMenuItem: jest.fn(),
  deleteMenuItem: jest.fn(),
  fetchMore: jest.fn(),
  hasMore: false,
  isFetching: false,
  isLoading: false,
  items: [],
  updateMenuItem: jest.fn(),
};

describe('MenuItemsContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMenuItems.mockReturnValue(defaultMock);
    global.IntersectionObserver = jest.fn().mockImplementation(() => {
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
      };
    });
  });

  it('should render the section title', () => {
    render(<MenuItemsContainer isOwner={false} restaurantId="1" />);

    expect(screen.getByText(DISPLAY.TITLES.MENU_ITEMS)).toBeVisible();
  });

  it('should render the Add Item button when isOwner is true', () => {
    render(<MenuItemsContainer isOwner={true} restaurantId="1" />);

    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_MENU_ITEM })).toBeVisible();
  });

  it('should not render the Add Item button when isOwner is false', () => {
    render(<MenuItemsContainer isOwner={false} restaurantId="1" />);

    expect(
      screen.queryByRole('button', { name: DISPLAY.ACTIONS.ADD_MENU_ITEM }),
    ).not.toBeInTheDocument();
  });

  it('should show the empty state when there are no menu items', () => {
    render(<MenuItemsContainer isOwner={false} restaurantId="1" />);

    expect(screen.getByText(DISPLAY.EMPTY.NO_MENU_ITEMS)).toBeVisible();
  });

  it('should open the menu item form when Add Item is clicked', async () => {
    const user = userEvent.setup();

    render(<MenuItemsContainer isOwner={true} restaurantId="1" />);
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_MENU_ITEM }));

    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE })).toBeVisible();
    expect(screen.getByText(DISPLAY.TITLES.CREATE_MENU_ITEM)).toBeVisible();
  });
});
