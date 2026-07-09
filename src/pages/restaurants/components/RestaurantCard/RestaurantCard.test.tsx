import { RESTAURANT_STATUS } from '@pages/restaurants/constants/restaurant.constants';
import type { Restaurant } from '@pages/restaurants/types/restaurant.types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RestaurantCard } from './RestaurantCard';

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

const renderRestaurantCard = (
  props: {
    onClick?: jest.Mock;
    restaurant?: Restaurant;
  } = {},
) => {
  return render(
    <RestaurantCard
      onClick={props.onClick ?? jest.fn()}
      restaurant={props.restaurant ?? mockRestaurant}
    />,
  );
};

describe('RestaurantCard', () => {
  it('should render the restaurant name and description', () => {
    renderRestaurantCard();

    expect(screen.getByText('Tandoori Palace')).toBeVisible();
    expect(screen.getByText('Good food')).toBeVisible();
  });

  it('should not render a description when it is empty', () => {
    renderRestaurantCard({ restaurant: { ...mockRestaurant, description: '' } });

    expect(screen.queryByText('Good food')).not.toBeInTheDocument();
  });

  it('should call onClick with the restaurant id when clicked', async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    renderRestaurantCard({ onClick });

    await user.click(screen.getByText('Tandoori Palace'));

    expect(onClick).toHaveBeenCalledWith('1');
  });
});
