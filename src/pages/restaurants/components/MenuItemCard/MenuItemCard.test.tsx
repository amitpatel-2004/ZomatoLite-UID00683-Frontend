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
    isOwner?: boolean;
    item?: MenuItem;
    onDelete?: jest.Mock;
    onEdit?: jest.Mock;
  } = {},
) => {
  return render(
    <MenuItemCard
      isOwner={props.isOwner ?? false}
      item={props.item ?? mockItem}
      onDelete={props.onDelete ?? jest.fn()}
      onEdit={props.onEdit ?? jest.fn()}
    />,
  );
};

describe('MenuItemCard', () => {
  it('should render the item name, description and price', () => {
    renderMenuItemCard();

    expect(screen.getByText('White sauce pasta')).toBeVisible();
    expect(screen.getByText('Authentic pasta with white sauce')).toBeVisible();
    expect(screen.getByText('₹249.00/-')).toBeVisible();
  });

  it('should not render a description when it is empty', () => {
    renderMenuItemCard({ item: { ...mockItem, description: '' } });

    expect(screen.queryByText('Authentic pasta with white sauce')).not.toBeInTheDocument();
  });

  it('should not render the owner actions menu when isOwner is false', () => {
    renderMenuItemCard({ isOwner: false });

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render the owner actions menu when isOwner is true', () => {
    renderMenuItemCard({ isOwner: true });

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('should call onEdit when Edit is clicked', async () => {
    const onEdit = jest.fn();
    const user = userEvent.setup();
    renderMenuItemCard({ isOwner: true, onEdit });

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('menuitem', { name: new RegExp(DISPLAY.ACTIONS.EDIT) }));

    expect(onEdit).toHaveBeenCalledWith(mockItem);
  });

  it('should call onDelete when the delete confirmation is accepted', async () => {
    const onDelete = jest.fn();
    const user = userEvent.setup();
    renderMenuItemCard({ isOwner: true, onDelete });

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('menuitem', { name: new RegExp(DISPLAY.ACTIONS.DELETE) }));
    await user.click(await screen.findByRole('button', { name: DISPLAY.POPCONFIRM.OK_TEXT }));

    expect(onDelete).toHaveBeenCalledWith(mockItem._id);
  });
});
