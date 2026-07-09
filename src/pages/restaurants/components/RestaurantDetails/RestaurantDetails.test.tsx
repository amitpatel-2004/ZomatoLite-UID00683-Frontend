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

const renderRestaurantDetails = (
  props: {
    isOwner?: boolean;
    onDelete?: jest.Mock;
    onEdit?: jest.Mock;
    onGoToOrders?: jest.Mock;
    restaurant?: Restaurant;
  } = {},
) => {
  return render(
    <RestaurantDetails
      isOwner={props.isOwner ?? false}
      onDelete={props.onDelete ?? jest.fn()}
      onEdit={props.onEdit ?? jest.fn()}
      onGoToOrders={props.onGoToOrders ?? jest.fn()}
      restaurant={props.restaurant ?? mockRestaurant}
    />,
  );
};

describe('RestaurantDetails', () => {
  it('should render the restaurant name and description', () => {
    renderRestaurantDetails();

    expect(screen.getByText('Tandoori Palace')).toBeVisible();
    expect(screen.getByText('Good food')).toBeVisible();
  });

  it('should not render owner actions when isOwner is false', () => {
    renderRestaurantDetails({ isOwner: false });

    expect(
      screen.queryByRole('button', { name: new RegExp(DISPLAY.ACTIONS.EDIT) }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: new RegExp(DISPLAY.ACTIONS.DELETE) }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: DISPLAY.ACTIONS.GO_TO_ORDERS }),
    ).not.toBeInTheDocument();
  });

  it('should render owner actions when isOwner is true', () => {
    renderRestaurantDetails({ isOwner: true });

    expect(screen.getByRole('button', { name: new RegExp(DISPLAY.ACTIONS.EDIT) })).toBeVisible();
    expect(screen.getByRole('button', { name: new RegExp(DISPLAY.ACTIONS.DELETE) })).toBeVisible();
    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.GO_TO_ORDERS })).toBeVisible();
  });

  it('should call onEdit when Edit is clicked', async () => {
    const onEdit = jest.fn();
    const user = userEvent.setup();
    renderRestaurantDetails({ isOwner: true, onEdit });

    await user.click(screen.getByRole('button', { name: new RegExp(DISPLAY.ACTIONS.EDIT) }));

    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('should call onDelete when the delete confirmation is accepted', async () => {
    const onDelete = jest.fn();
    const user = userEvent.setup();
    renderRestaurantDetails({ isOwner: true, onDelete });

    await user.click(screen.getByRole('button', { name: new RegExp(DISPLAY.ACTIONS.DELETE) }));
    await user.click(screen.getByRole('button', { name: DISPLAY.POPCONFIRM.OK_TEXT }));

    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('should call onGoToOrders when View Orders is clicked', async () => {
    const onGoToOrders = jest.fn();
    const user = userEvent.setup();
    renderRestaurantDetails({ isOwner: true, onGoToOrders });

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.GO_TO_ORDERS }));

    expect(onGoToOrders).toHaveBeenCalledTimes(1);
  });
});
