import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { ORDER_STATUS } from '@pages/restaurants/constants/order.constants';
import { MENU_ITEM_STATUS } from '@pages/restaurants/constants/restaurant.constants';
import type { MenuItem } from '@pages/restaurants/types/restaurant.types';
import { menuItemService } from '@services/menuItem/menuItemService';
import { orderService } from '@services/restaurant/orderService';
import { renderWithStore } from '@test/utils/renderWithStore';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MenuItemsContainer } from './MenuItemsContainer';

import '@testing-library/jest-dom';

jest.mock('@services/menuItem/menuItemService', () => {
  return {
    menuItemService: {
      list: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getUploadUrl: jest.fn(),
      uploadImage: jest.fn(),
    },
  };
});

jest.mock('@services/restaurant/orderService', () => {
  return {
    orderService: {
      create: jest.fn(),
    },
  };
});

const mockList = jest.mocked(menuItemService.list);
const mockCreate = jest.mocked(menuItemService.create);
const mockGetUploadUrl = jest.mocked(menuItemService.getUploadUrl);
const mockUploadImage = jest.mocked(menuItemService.uploadImage);
const mockCreateOrder = jest.mocked(orderService.create);

const mockItem: MenuItem = {
  _id: 'item1',
  name: 'White sauce pasta',
  description: 'Authentic pasta with white sauce',
  price: 249,
  isVeg: true,
  imagePath: null,
  rating: 0,
  quantity: 10,
  status: MENU_ITEM_STATUS.ACTIVE,
};

const fillMenuItemForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByRole('textbox', { name: DISPLAY.LABELS.NAME }), 'Chicken Biryani');
  await user.type(screen.getByPlaceholderText('0.00'), '249');
};

global.IntersectionObserver = jest.fn().mockImplementation(() => {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
});
window.URL.createObjectURL = jest.fn(() => {
  return 'blob:mock-url';
});
window.URL.revokeObjectURL = jest.fn();

describe('MenuItemsContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockList.mockResolvedValue({ items: [], hasMore: false, nextCursor: null });
  });

  it('should render the section title and empty state', async () => {
    renderWithStore(
      <MenuItemsContainer isOwner={false} restaurantId="1" restaurantName="Tandoori Palace" />,
    );

    expect(screen.getByText(DISPLAY.TITLES.MENU_ITEMS)).toBeVisible();
    expect(await screen.findByText(DISPLAY.EMPTY.NO_MENU_ITEMS)).toBeVisible();
  });

  it('should not render the Add Item button when isOwner is false', () => {
    renderWithStore(
      <MenuItemsContainer isOwner={false} restaurantId="1" restaurantName="Tandoori Palace" />,
    );

    expect(
      screen.queryByRole('button', { name: DISPLAY.ACTIONS.ADD_MENU_ITEM }),
    ).not.toBeInTheDocument();
  });

  it('should render the Add Item button when isOwner is true', () => {
    renderWithStore(
      <MenuItemsContainer isOwner={true} restaurantId="1" restaurantName="Tandoori Palace" />,
    );

    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_MENU_ITEM })).toBeVisible();
  });

  it('should open the menu item form when Add Item is clicked', async () => {
    const user = userEvent.setup();
    renderWithStore(
      <MenuItemsContainer isOwner={true} restaurantId="1" restaurantName="Tandoori Palace" />,
    );

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_MENU_ITEM }));

    expect(screen.getByRole('dialog', { name: DISPLAY.TITLES.CREATE_MENU_ITEM })).toBeVisible();
    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE })).toBeVisible();
  });

  it('should create the menu item, show a success message and close the form', async () => {
    mockCreate.mockResolvedValue({ ...mockItem, description: '', quantity: null });
    const user = userEvent.setup();
    renderWithStore(
      <MenuItemsContainer isOwner={true} restaurantId="1" restaurantName="Tandoori Palace" />,
    );

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_MENU_ITEM }));
    await fillMenuItemForm(user);
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE }));

    expect(await screen.findByText(MESSAGES.SUCCESS.MENU_ITEM_CREATED)).toBeVisible();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('White sauce pasta')).toBeVisible();
  });

  it('should upload the image and create the menu item when an image is provided', async () => {
    mockGetUploadUrl.mockResolvedValue({
      uploadUrl: 'https://storage.example.com/upload',
      imagePath: 'menu-items/pic.png',
    });
    mockUploadImage.mockResolvedValue(undefined);
    mockCreate.mockResolvedValue({ ...mockItem, imagePath: 'menu-items/pic.png', quantity: null });
    const user = userEvent.setup();
    renderWithStore(
      <MenuItemsContainer isOwner={true} restaurantId="1" restaurantName="Tandoori Palace" />,
    );

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_MENU_ITEM }));
    await fillMenuItemForm(user);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(fileInput, new File(['pic'], 'pic.png', { type: 'image/png' }));

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE }));

    expect(await screen.findByText(MESSAGES.SUCCESS.MENU_ITEM_CREATED)).toBeVisible();
    expect(mockUploadImage).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith(
      '1',
      expect.objectContaining({ imagePath: 'menu-items/pic.png' }),
    );
  });

  it('should show an error and not create the menu item when the image upload fails', async () => {
    mockGetUploadUrl.mockRejectedValue(new Error('Storage is unavailable.'));
    const user = userEvent.setup();

    renderWithStore(
      <MenuItemsContainer isOwner={true} restaurantId="1" restaurantName="Tandoori Palace" />,
    );
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_MENU_ITEM }));
    await fillMenuItemForm(user);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(fileInput, new File(['pic'], 'pic.png', { type: 'image/png' }));

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE }));

    expect(await screen.findByText('Storage is unavailable.')).toBeVisible();
    expect(mockCreate).not.toHaveBeenCalled();
    expect(screen.getByRole('dialog', { name: DISPLAY.TITLES.CREATE_MENU_ITEM })).toBeVisible();
  });

  it('should call deleteMenuItem and show a success message when the delete confirmation is accepted', async () => {
    mockList.mockResolvedValue({ items: [mockItem], hasMore: false, nextCursor: null });
    const user = userEvent.setup();

    renderWithStore(
      <MenuItemsContainer isOwner={true} restaurantId="1" restaurantName="Tandoori Palace" />,
    );
    await user.click(await screen.findByRole('button', { name: 'more' }));
    await user.click(screen.getByRole('menuitem', { name: new RegExp(DISPLAY.ACTIONS.DELETE) }));
    await user.click(await screen.findByRole('button', { name: DISPLAY.POPCONFIRM.OK_TEXT }));

    expect(await screen.findByText(MESSAGES.SUCCESS.MENU_ITEM_DELETED)).toBeVisible();
    expect(screen.queryByText('White sauce pasta')).not.toBeInTheDocument();
  });

  it('should add an item to the cart, place the order and show a success message', async () => {
    mockList.mockResolvedValue({ items: [mockItem], hasMore: false, nextCursor: null });
    mockCreateOrder.mockResolvedValue({
      _id: 'order1',
      restaurantId: '1',
      restaurantName: 'Tandoori Palace',
      customerId: 'customer1',
      status: ORDER_STATUS.PENDING,
      currency: { code: 'INR', symbol: '₹' },
      pricingSummary: { subtotal: 249, bookingFee: 20, total: 269 },
      items: [{ name: mockItem.name, quantity: 1, unitPrice: mockItem.price }],
      _createdAt: 0,
      _updatedAt: 0,
    });
    const user = userEvent.setup();

    renderWithStore(
      <MenuItemsContainer isOwner={false} restaurantId="1" restaurantName="Tandoori Palace" />,
    );

    await user.click(await screen.findByRole('button', { name: DISPLAY.ACTIONS.ADD_TO_CART }));
    await user.click(await screen.findByRole('button', { name: DISPLAY.ACTIONS.PROCEED_TO_ORDER }));
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.PLACE_ORDER }));

    expect(await screen.findByText(MESSAGES.SUCCESS.ORDER_PLACED)).toBeVisible();
    expect(mockCreateOrder).toHaveBeenCalledWith('1', {
      items: [{ itemId: mockItem._id, quantity: 1, unitPrice: mockItem.price }],
    });
    expect(
      screen.queryByRole('button', { name: DISPLAY.ACTIONS.PROCEED_TO_ORDER }),
    ).not.toBeInTheDocument();
  });
});
