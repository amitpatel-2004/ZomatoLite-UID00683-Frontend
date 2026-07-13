import { DISPLAY } from '@pages/restaurants/constants/display.constants';
import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { MENU_ITEM_STATUS } from '@pages/restaurants/constants/restaurant.constants';
import type { MenuItem } from '@pages/restaurants/types/restaurant.types';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MenuItemForm } from './MenuItemForm';

import '@testing-library/jest-dom';

const renderMenuItemForm = (
  props: {
    handleSubmit?: jest.Mock;
    onClose?: jest.Mock;
    initialValues?: MenuItem | null;
  } = {},
) => {
  return render(
    <MenuItemForm
      handleSubmit={props.handleSubmit ?? jest.fn()}
      initialValues={props.initialValues ?? null}
      isSubmitting={false}
      onClose={props.onClose ?? jest.fn()}
      open={true}
    />,
  );
};

describe('MenuItemForm', () => {
  it('should render all form fields and buttons', () => {
    renderMenuItemForm();

    expect(screen.getByRole('textbox', { name: DISPLAY.LABELS.NAME })).toBeVisible();
    expect(screen.getByText(DISPLAY.LABELS.PRICE)).toBeVisible();
    expect(screen.getByText(DISPLAY.LABELS.QUANTITY)).toBeVisible();
    expect(screen.getByRole('radio', { name: DISPLAY.LABELS.VEG })).toBeVisible();
    expect(screen.getByRole('radio', { name: DISPLAY.LABELS.NON_VEG })).toBeVisible();
    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.CANCEL })).toBeVisible();
    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE })).toBeVisible();
  });

  it('should render the create title when there are no initial values', () => {
    renderMenuItemForm();

    expect(screen.getByText(DISPLAY.TITLES.CREATE_MENU_ITEM)).toBeVisible();
  });

  it('should render the edit title when initial values are provided', () => {
    renderMenuItemForm({
      initialValues: {
        _id: '1',
        name: 'Chicken Biryani',
        description: '',
        price: 249,
        isVeg: false,
        imagePath: null,
        rating: 0,
        quantity: 10,
        status: MENU_ITEM_STATUS.ACTIVE,
      },
    });

    expect(screen.getByText(DISPLAY.TITLES.EDIT_MENU_ITEM)).toBeVisible();
  });

  it('should default the veg/non-veg selection to Veg', () => {
    renderMenuItemForm();

    expect(screen.getByRole('radio', { name: DISPLAY.LABELS.VEG })).toBeChecked();
    expect(screen.getByRole('radio', { name: DISPLAY.LABELS.NON_VEG })).not.toBeChecked();
  });

  it('should show error when focus is lost (onBlur)', async () => {
    const user = userEvent.setup();
    renderMenuItemForm();

    await user.click(screen.getByRole('textbox', { name: DISPLAY.LABELS.NAME }));
    await user.tab();

    expect(await screen.findByText(MESSAGES.VALIDATION.NAME_REQUIRED)).toBeVisible();
  });

  it('should display required error messages on form submission with empty values', async () => {
    const user = userEvent.setup();
    renderMenuItemForm();

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE }));

    expect(await screen.findByText(MESSAGES.VALIDATION.NAME_REQUIRED)).toBeVisible();
    expect(screen.getByText(MESSAGES.VALIDATION.PRICE_REQUIRED)).toBeVisible();
  });

  it('should display validation error messages on form submission and should not submit', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    renderMenuItemForm({ handleSubmit });

    await user.type(screen.getByRole('textbox', { name: DISPLAY.LABELS.NAME }), 'Chicken Biryani');
    await user.type(screen.getByPlaceholderText('0.00'), '249');
    await user.type(screen.getByPlaceholderText('0'), '5.5');
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE }));

    expect(await screen.findByText(MESSAGES.VALIDATION.QUANTITY_INTEGER)).toBeVisible();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('should call onClose when Cancel is clicked', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();
    renderMenuItemForm({ onClose });

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.CANCEL }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call handleSubmit with the entered values when the form is valid', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    renderMenuItemForm({ handleSubmit });

    await user.type(screen.getByRole('textbox', { name: DISPLAY.LABELS.NAME }), 'Chicken Biryani');
    await user.type(screen.getByPlaceholderText('0.00'), '249');
    await user.type(screen.getByPlaceholderText('0'), '10');
    await user.click(screen.getByRole('radio', { name: DISPLAY.LABELS.NON_VEG }));

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.SAVE }));

    await waitFor(() => {
      return expect(handleSubmit).toHaveBeenCalledWith(
        {
          name: 'Chicken Biryani',
          description: '',
          price: 249,
          isVeg: false,
          quantity: 10,
          imageFile: null,
          existingImagePath: null,
        },
        expect.anything(),
      );
    });
  });
});
