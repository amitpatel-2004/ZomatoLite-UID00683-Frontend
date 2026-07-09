import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { RESTAURANT_STATUS } from '@pages/restaurants/constants/restaurant.constants';
import type { Restaurant } from '@pages/restaurants/types/restaurant.types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RestaurantDetails } from './RestaurantDetails';

import '@testing-library/jest-dom';

const mockRestaurant: Restaurant = {
  _id: '1',
  ownerId: 'owner1',
  name: 'Tandoori Palace',
  description: 'Good food',
  cuisineTypes: ['indian'],
  rating: 0,
  status: RESTAURANT_STATUS.ACTIVE,
  openingTime: '09:00',
  closingTime: '22:00',
};

describe('RestaurantDetails', () => {
  it('should render the restaurant name', () => {
    render(
      <RestaurantDetails
        isOwner={false}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
        onGoToOrders={jest.fn()}
        restaurant={mockRestaurant}
      />,
    );

    expect(screen.getByText('Tandoori Palace')).toBeVisible();
  });

  it('should render the description when provided', () => {
    render(
      <RestaurantDetails
        isOwner={false}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
        onGoToOrders={jest.fn()}
        restaurant={mockRestaurant}
      />,
    );

    expect(screen.getByText('Good food')).toBeVisible();
  });

  it('should not render owner actions when isOwner is false', () => {
    render(
      <RestaurantDetails
        isOwner={false}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
        onGoToOrders={jest.fn()}
        restaurant={mockRestaurant}
      />,
    );

    expect(screen.queryByRole('button', { name: /Edit/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Delete/ })).not.toBeInTheDocument();
  });

  it('should render owner actions when isOwner is true', () => {
    render(
      <RestaurantDetails
        isOwner={true}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
        onGoToOrders={jest.fn()}
        restaurant={mockRestaurant}
      />,
    );

    expect(screen.getByRole('button', { name: /Edit/ })).toBeVisible();
    expect(screen.getByRole('button', { name: /Delete/ })).toBeVisible();
  });

  it('should call onEdit when Edit is clicked', async () => {
    const onEdit = jest.fn();
    const user = userEvent.setup();
    render(
      <RestaurantDetails
        isOwner={true}
        onDelete={jest.fn()}
        onEdit={onEdit}
        onGoToOrders={jest.fn()}
        restaurant={mockRestaurant}
      />,
    );

    await user.click(screen.getByRole('button', { name: /Edit/ }));

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('should call onDelete when the delete confirmation is accepted', async () => {
    const onDelete = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(
      <RestaurantDetails
        isOwner={true}
        onDelete={onDelete}
        onEdit={jest.fn()}
        onGoToOrders={jest.fn()}
        restaurant={mockRestaurant}
      />,
    );

    await user.click(screen.getByRole('button', { name: /Delete/ }));
    await user.click(screen.getByRole('button', { name: DISPLAY.POPCONFIRM.OK_TEXT }));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
