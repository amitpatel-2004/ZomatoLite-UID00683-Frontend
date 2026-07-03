import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RegisterForm } from './RegisterForm';

import '@testing-library/jest-dom';

const renderRegisterForm = (
  props: { handleSubmit?: jest.Mock; onLoginClick?: () => void } = {},
) => {
  return render(
    <RegisterForm
      handleSubmit={props.handleSubmit ?? jest.fn().mockResolvedValue(undefined)}
      isLoading={false}
      onLoginClick={props.onLoginClick ?? jest.fn()}
    />,
  );
};

describe('RegisterForm', () => {
  it('should render all form fields', () => {
    renderRegisterForm();

    expect(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.DISPLAY_NAME)).toBeVisible();
    expect(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.EMAIL)).toBeVisible();
    expect(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.CREATE_PASSWORD)).toBeVisible();
    expect(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.CONFIRM_PASSWORD)).toBeVisible();
  });

  it('should render role radio buttons', () => {
    renderRegisterForm();

    expect(screen.getByText(DISPLAY.LABELS.ROLE_CUSTOMER)).toBeVisible();
    expect(screen.getByText(DISPLAY.LABELS.ROLE_OWNER)).toBeVisible();
  });

  it('should render the submit button and login link', () => {
    renderRegisterForm();

    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.REGISTER })).toBeVisible();
    expect(screen.getByText(DISPLAY.ACTIONS.GO_TO_LOGIN)).toBeVisible();
  });

  it('should show error when the display name contains invalid characters', async () => {
    const user = userEvent.setup();
    renderRegisterForm();

    await user.type(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.DISPLAY_NAME), 'John@Doe');
    await user.tab();

    expect(await screen.findByText(MESSAGES.VALIDATION.DISPLAY_NAME_PATTERN)).toBeVisible();
  });

  it('should show error when the passwords do not match', async () => {
    const user = userEvent.setup();
    renderRegisterForm();

    await user.type(
      screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.CREATE_PASSWORD),
      'password123',
    );
    await user.type(
      screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.CONFIRM_PASSWORD),
      'password456',
    );
    await user.tab();

    expect(await screen.findByText(MESSAGES.VALIDATION.PASSWORD_MISMATCH)).toBeVisible();
  });

  it('should not call handleSubmit when the form is submitted with empty fields', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderRegisterForm({ handleSubmit });

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.REGISTER }));

    expect(await screen.findByText(MESSAGES.VALIDATION.DISPLAY_NAME_REQUIRED)).toBeVisible();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('should call handleSubmit with the entered values when the form is valid', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderRegisterForm({ handleSubmit });

    await user.type(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.DISPLAY_NAME), 'John Doe');
    await user.type(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.EMAIL), 'user@example.com');
    await user.type(
      screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.CREATE_PASSWORD),
      'password123',
    );
    await user.type(
      screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.CONFIRM_PASSWORD),
      'password123',
    );
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.REGISTER }));

    await waitFor(() => {
      return expect(handleSubmit).toHaveBeenCalledWith(
        {
          confirmPassword: 'password123',
          displayName: 'John Doe',
          email: 'user@example.com',
          password: 'password123',
          role: USER_ROLES.CUSTOMER,
        },
        expect.anything(),
      );
    });
  });

  it('should call onLoginClick when the login link is clicked', async () => {
    const onLoginClick = jest.fn();
    const user = userEvent.setup();

    renderRegisterForm({ onLoginClick });

    await user.click(screen.getByText(DISPLAY.ACTIONS.GO_TO_LOGIN));

    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });
});
