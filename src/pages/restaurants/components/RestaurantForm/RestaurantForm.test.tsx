import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { RESTAURANT_STATUS } from '@pages/restaurants/constants/restaurant.constants';
import type { Restaurant } from '@pages/restaurants/types/restaurant.types';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RestaurantForm } from './RestaurantForm';

import '@testing-library/jest-dom';

const renderRestaurantForm = (
  props: {
    handleSubmit?: jest.Mock;
    onClose?: jest.Mock;
    initialValues?: Restaurant | null;
  } = {},
) => {
  return render(
    <RestaurantForm
      handleSubmit={props.handleSubmit ?? jest.fn().mockResolvedValue(undefined)}
      initialValues={props.initialValues ?? null}
      isSubmitting={false}
      onClose={props.onClose ?? jest.fn()}
      open={true}
    />,
  );
};

const selectCuisineType = (label: string) => {
  const option = document.querySelector(`.ant-select-item[title="${label}"]`) as HTMLElement;
  fireEvent.mouseDown(option);
  fireEvent.click(option);
};

describe('RestaurantForm', () => {
  it('should render all form fields', () => {
    renderRestaurantForm();

    expect(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.RESTAURANT_NAME)).toBeVisible();
    expect(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.RESTAURANT_DESCRIPTION)).toBeVisible();
    expect(screen.getByText(DISPLAY.PLACEHOLDERS.CUISINE_TYPES)).toBeVisible();
    expect(screen.getByText(DISPLAY.LABELS.OPENING_TIME)).toBeVisible();
    expect(screen.getByText(DISPLAY.LABELS.CLOSING_TIME)).toBeVisible();
  });

  it('should render the create title when there are no initial values', () => {
    renderRestaurantForm();

    expect(screen.getByText(DISPLAY.TITLES.CREATE_RESTAURANT)).toBeVisible();
  });

  it('should render the edit title when initial values are provided', () => {
    renderRestaurantForm({
      initialValues: {
        _id: '1',
        ownerId: 'owner1',
        name: 'Tandoori Palace',
        description: '',
        cuisineTypes: ['indian'],
        rating: 0,
        status: RESTAURANT_STATUS.ACTIVE,
        openingTime: '09:00',
        closingTime: '22:00',
      },
    });

    expect(screen.getByText(DISPLAY.TITLES.EDIT_RESTAURANT)).toBeVisible();
  });

  it('should show an error when the name field is left empty', async () => {
    const user = userEvent.setup();
    renderRestaurantForm();

    await user.click(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.RESTAURANT_NAME));
    await user.tab();

    expect(await screen.findByText(MESSAGES.VALIDATION.NAME_REQUIRED)).toBeVisible();
  });

  it('should not call handleSubmit when the form is submitted with empty fields', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderRestaurantForm({ handleSubmit });

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE }));

    expect(await screen.findByText(MESSAGES.VALIDATION.NAME_REQUIRED)).toBeVisible();
    expect(screen.getByText(MESSAGES.VALIDATION.CUISINE_TYPES_REQUIRED)).toBeVisible();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('should call onClose when Cancel is clicked', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    renderRestaurantForm({ onClose });

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.CANCEL }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call handleSubmit with the entered values when the form is valid', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderRestaurantForm({ handleSubmit });

    await user.type(
      screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.RESTAURANT_NAME),
      'Tandoori Palace',
    );

    await user.click(screen.getByRole('combobox'));
    selectCuisineType('Indian');

    const openingTime = document.querySelector('input[name="openingTime"]') as HTMLInputElement;
    const closingTime = document.querySelector('input[name="closingTime"]') as HTMLInputElement;
    await user.type(openingTime, '0930');
    await user.type(closingTime, '2200');

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE }));

    await waitFor(() => {
      return expect(handleSubmit).toHaveBeenCalledWith(
        {
          name: 'Tandoori Palace',
          description: '',
          cuisineTypes: ['indian'],
          openingTime: '09:30',
          closingTime: '22:00',
        },
        expect.anything(),
      );
    });
  });
});
