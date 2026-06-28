import type { Restaurant } from '@appTypes/restaurant.types';
import { RESTAURANT_STATUS } from '@constants/restaurant.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RestaurantCard } from './RestaurantCard';

import '@testing-library/jest-dom';

const mockRestaurant: Restaurant = {
  _id: '1',
  ownerId: 'owner1',
  name: 'Test Restaurant',
  description: 'Good food',
  cuisineTypes: ['italian'],
  rating: 0,
  status: RESTAURANT_STATUS.ACTIVE,
  openingTime: '09:00',
  closingTime: '22:00',
};

describe('RestaurantCard', () => {
  it('should render restaurant name', () => {
    render(<RestaurantCard restaurant={mockRestaurant} onClick={jest.fn()} />);

    expect(screen.getByText('Test Restaurant')).toBeVisible();
  });

  it('should show no-rating text when rating is 0', () => {
    render(<RestaurantCard restaurant={mockRestaurant} onClick={jest.fn()} />);

    expect(screen.getByText(DISPLAY.EMPTY.NO_RATING)).toBeVisible();
  });

  it('should show rating value when greater than 0', () => {
    render(<RestaurantCard restaurant={{ ...mockRestaurant, rating: 4.3 }} onClick={jest.fn()} />);

    expect(screen.getByText('4.3')).toBeVisible();
  });

  it('should render the description when provided', () => {
    render(<RestaurantCard restaurant={mockRestaurant} onClick={jest.fn()} />);

    expect(screen.getByText('Good food')).toBeVisible();
  });

  it('should not render a description when it is empty', () => {
    render(
      <RestaurantCard restaurant={{ ...mockRestaurant, description: '' }} onClick={jest.fn()} />,
    );

    expect(screen.queryByText('Good food')).not.toBeInTheDocument();
  });

  it('should call onClick with the restaurant id when clicked', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();

    render(<RestaurantCard restaurant={mockRestaurant} onClick={onClick} />);
    await user.click(screen.getByText('Test Restaurant'));

    expect(onClick).toHaveBeenCalledWith('1');
  });
});
