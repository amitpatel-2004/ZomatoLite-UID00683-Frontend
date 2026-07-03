import { DISPLAY } from '@pages/auth/constants/display.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './LoginForm';

import '@testing-library/jest-dom';

const renderLoginForm = (
  props: { handleSubmit?: jest.Mock; onRegisterClick?: () => void } = {},
) => {
  return render(
    <LoginForm
      handleSubmit={props.handleSubmit ?? jest.fn().mockResolvedValue(undefined)}
      isLoading={false}
      onRegisterClick={props.onRegisterClick ?? jest.fn()}
    />,
  );
};

describe('LoginForm', () => {
  it('should render email and password inputs', () => {
    renderLoginForm();

    expect(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.EMAIL)).toBeVisible();
    expect(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.PASSWORD)).toBeVisible();
  });

  it('should render the submit button and register link', () => {
    renderLoginForm();

    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.LOGIN })).toBeVisible();
    expect(screen.getByText(DISPLAY.ACTIONS.GO_TO_REGISTER)).toBeVisible();
  });

  it('should show error when invalid email is entered', async () => {
    const user = userEvent.setup();
    renderLoginForm();

    await user.type(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.EMAIL), 'not-an-email');
    await user.tab();

    expect(await screen.findByText(MESSAGES.VALIDATION.EMAIL_INVALID)).toBeVisible();
  });

  it('should show error when the password is too short', async () => {
    const user = userEvent.setup();
    renderLoginForm();

    await user.type(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.PASSWORD), '123');
    await user.tab();

    expect(await screen.findByText(MESSAGES.VALIDATION.PASSWORD_MIN)).toBeVisible();
  });

  it('should not call handleSubmit when the form is submitted with empty fields', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderLoginForm({ handleSubmit });

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.LOGIN }));

    expect(await screen.findByText(MESSAGES.VALIDATION.EMAIL_REQUIRED)).toBeVisible();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('should call handleSubmit with the entered values when the form is valid', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderLoginForm({ handleSubmit });

    await user.type(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.EMAIL), 'user@example.com');
    await user.type(screen.getByPlaceholderText(DISPLAY.PLACEHOLDERS.PASSWORD), 'password123');
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.LOGIN }));

    await waitFor(() => {
      return expect(handleSubmit).toHaveBeenCalledWith(
        { email: 'user@example.com', password: 'password123' },
        expect.anything(),
      );
    });
  });

  it('should call onRegisterClick when the register link is clicked', async () => {
    const onRegisterClick = jest.fn();
    const user = userEvent.setup();

    renderLoginForm({ onRegisterClick });

    await user.click(screen.getByText(DISPLAY.ACTIONS.GO_TO_REGISTER));

    expect(onRegisterClick).toHaveBeenCalledTimes(1);
  });
});
