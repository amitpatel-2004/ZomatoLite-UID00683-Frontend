import type { MenuItem } from '@appTypes/restaurant.types';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { render, screen } from '@testing-library/react';

import { MenuItemCard } from './MenuItemCard';

import '@testing-library/jest-dom';

jest.mock('@constants/firebase.constants', () => ({
  getImageUrl: () => null,
}));

const mockItem: MenuItem = {
  _id: 'item1',
  name: 'White sauce pasta',
  description: 'Authentic pasta with white sauce',
  price: 249,
  isVeg: true,
  imagePath: null,
  rating: 0,
  quantity: 10,
};

describe('MenuItemCard', () => {
  it('should render the item name and price', () => {
    render(
      <MenuItemCard isOwner={false} item={mockItem} onDelete={jest.fn()} onEdit={jest.fn()} />,
    );

    expect(screen.getByText('White sauce pasta')).toBeVisible();
    expect(screen.getByText('₹249.00/-')).toBeVisible();
  });

  it('should show no-rating text when rating is 0', () => {
    render(
      <MenuItemCard isOwner={false} item={mockItem} onDelete={jest.fn()} onEdit={jest.fn()} />,
    );

    expect(screen.getByText(DISPLAY.EMPTY.NO_RATING)).toBeVisible();
  });

  it('should show the rating when greater than 0', () => {
    render(
      <MenuItemCard
        isOwner={false}
        item={{ ...mockItem, rating: 4.2 }}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />,
    );

    expect(screen.getByText('4.2')).toBeVisible();
  });

  it('should render the description when provided', () => {
    render(
      <MenuItemCard isOwner={false} item={mockItem} onDelete={jest.fn()} onEdit={jest.fn()} />,
    );

    expect(screen.getByText('Authentic pasta with white sauce')).toBeVisible();
  });

  it('should not render the three-dot menu when isOwner is false', () => {
    render(
      <MenuItemCard isOwner={false} item={mockItem} onDelete={jest.fn()} onEdit={jest.fn()} />,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('should render the three-dot menu when isOwner is true', () => {
    render(<MenuItemCard isOwner={true} item={mockItem} onDelete={jest.fn()} onEdit={jest.fn()} />);

    expect(screen.getByRole('button')).toBeVisible();
  });
});
