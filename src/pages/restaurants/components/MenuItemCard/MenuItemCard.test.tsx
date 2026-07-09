import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MENU_ITEM_STATUS } from '@pages/restaurants/constants/restaurant.constants';
import type { MenuItem } from '@pages/restaurants/types/restaurant.types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MenuItemCard } from './MenuItemCard';

import '@testing-library/jest-dom';

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

const renderMenuItemCard = (
  props: {
    cartQuantity?: number;
    isOwner?: boolean;
    item?: MenuItem;
    onAddToCart?: jest.Mock;
    onDecrement?: jest.Mock;
    onDelete?: jest.Mock;
    onEdit?: jest.Mock;
    onIncrement?: jest.Mock;
  } = {},
) => {
  return render(
    <MenuItemCard
      cartQuantity={props.cartQuantity ?? 0}
      isOwner={props.isOwner ?? false}
      item={props.item ?? mockItem}
      onAddToCart={props.onAddToCart ?? jest.fn()}
      onDecrement={props.onDecrement ?? jest.fn()}
      onDelete={props.onDelete ?? jest.fn()}
      onEdit={props.onEdit ?? jest.fn()}
      onIncrement={props.onIncrement ?? jest.fn()}
    />,
  );
};

describe('MenuItemCard', () => {
  it('should render the item name, description, price and Add button', () => {
    renderMenuItemCard();

    expect(screen.getByText('White sauce pasta')).toBeVisible();
    expect(screen.getByText('Authentic pasta with white sauce')).toBeVisible();
    expect(screen.getByText('₹249.00/-')).toBeVisible();
    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_TO_CART })).toBeVisible();
  });

  it('should not render a description when it is empty', () => {
    renderMenuItemCard({ item: { ...mockItem, description: '' } });

    expect(screen.queryByText('Authentic pasta with white sauce')).not.toBeInTheDocument();
  });

  it('should not render the owner actions menu when isOwner is false', () => {
    renderMenuItemCard({ isOwner: false });

    expect(screen.queryByRole('button', { name: 'more' })).not.toBeInTheDocument();
  });

  it('should render the owner actions menu when isOwner is true', () => {
    renderMenuItemCard({ isOwner: true });

    expect(screen.getByRole('button', { name: 'more' })).toBeVisible();
    expect(
      screen.queryByRole('button', { name: DISPLAY.ACTIONS.ADD_TO_CART }),
    ).not.toBeInTheDocument();
  });

  it('should call onEdit when Edit is clicked', async () => {
    const onEdit = jest.fn();
    const user = userEvent.setup();
    renderMenuItemCard({ isOwner: true, onEdit });

    await user.click(screen.getByRole('button', { name: 'more' }));
    await user.click(screen.getByRole('menuitem', { name: new RegExp(DISPLAY.ACTIONS.EDIT) }));

    expect(onEdit).toHaveBeenCalledWith(mockItem);
  });

  it('should call onDelete when the delete confirmation is accepted', async () => {
    const onDelete = jest.fn();
    const user = userEvent.setup();
    renderMenuItemCard({ isOwner: true, onDelete });

    await user.click(screen.getByRole('button', { name: 'more' }));
    await user.click(screen.getByRole('menuitem', { name: new RegExp(DISPLAY.ACTIONS.DELETE) }));
    await user.click(await screen.findByRole('button', { name: DISPLAY.POPCONFIRM.OK_TEXT }));

    expect(onDelete).toHaveBeenCalledWith(mockItem._id);
  });

  it('should call onAddToCart when Add is clicked', async () => {
    const onAddToCart = jest.fn();
    const user = userEvent.setup();
    renderMenuItemCard({ onAddToCart });

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.ADD_TO_CART }));

    expect(onAddToCart).toHaveBeenCalledWith(mockItem);
  });

  it('should show the quantity stepper instead of Add when cartQuantity is greater than 0', () => {
    renderMenuItemCard({ cartQuantity: 2 });

    expect(screen.getByText('2')).toBeVisible();
    expect(
      screen.queryByRole('button', { name: DISPLAY.ACTIONS.ADD_TO_CART }),
    ).not.toBeInTheDocument();
  });

  it('should call onIncrement and onDecrement when the stepper buttons are clicked', async () => {
    const onIncrement = jest.fn();
    const onDecrement = jest.fn();
    const user = userEvent.setup();
    renderMenuItemCard({ cartQuantity: 2, onIncrement, onDecrement });

    await user.click(screen.getByRole('button', { name: 'plus' }));
    await user.click(screen.getByRole('button', { name: 'minus' }));

    expect(onIncrement).toHaveBeenCalledWith(mockItem._id);
    expect(onDecrement).toHaveBeenCalledWith(mockItem._id);
  });
});
