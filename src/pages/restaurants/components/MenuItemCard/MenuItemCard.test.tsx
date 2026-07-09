import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MENU_ITEM_STATUS } from '@pages/restaurants/constants/restaurant.constants';
import type { MenuItem } from '@pages/restaurants/types/restaurant.types';
import { render, screen } from '@testing-library/react';

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

describe('MenuItemCard', () => {
  it('should render the item name and price', () => {
    render(
      <MenuItemCard
        cartQuantity={0}
        isOwner={false}
        item={mockItem}
        onAddToCart={jest.fn()}
        onDecrement={jest.fn()}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
        onIncrement={jest.fn()}
      />,
    );

    expect(screen.getByText('White sauce pasta')).toBeVisible();
    expect(screen.getByText('₹249.00/-')).toBeVisible();
  });

  it('should render the description when provided', () => {
    render(
      <MenuItemCard
        cartQuantity={0}
        isOwner={false}
        item={mockItem}
        onAddToCart={jest.fn()}
        onDecrement={jest.fn()}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
        onIncrement={jest.fn()}
      />,
    );

    expect(screen.getByText('Authentic pasta with white sauce')).toBeVisible();
  });

  it('should not render the three-dot menu when isOwner is false', () => {
    render(
      <MenuItemCard
        cartQuantity={0}
        isOwner={false}
        item={mockItem}
        onAddToCart={jest.fn()}
        onDecrement={jest.fn()}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
        onIncrement={jest.fn()}
      />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getByText(DISPLAY.ACTIONS.ADD_TO_CART)).toBeVisible();
  });

  it('should render the three-dot menu when isOwner is true', () => {
    render(
      <MenuItemCard
        cartQuantity={0}
        isOwner={true}
        item={mockItem}
        onAddToCart={jest.fn()}
        onDecrement={jest.fn()}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
        onIncrement={jest.fn()}
      />,
    );

    expect(screen.getByRole('button')).toBeVisible();
    expect(screen.queryByText(DISPLAY.ACTIONS.ADD_TO_CART)).not.toBeInTheDocument();
  });
});
