import { DISPLAY } from '@pages/auth/constants/display.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './LoginForm';

import '@testing-library/jest-dom';

const renderLoginForm = (
  props: { handleSubmit?: jest.Mock; onRegisterClick?: () => void } = {},
) => {
  return render(
    <LoginForm
      handleSubmit={props.handleSubmit ?? jest.fn()}
      isLoading={false}
      onRegisterClick={props.onRegisterClick ?? jest.fn()}
    />,
  );
};

describe('LoginForm', () => {
  it('should render inputs and submit buttons', () => {
    renderLoginForm();

    expect(screen.getByRole('textbox', { name: DISPLAY.LABELS.EMAIL })).toBeVisible();
    expect(screen.getByLabelText(DISPLAY.LABELS.PASSWORD)).toBeVisible();
    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.LOGIN })).toBeVisible();
    expect(screen.getByText(DISPLAY.ACTIONS.GO_TO_REGISTER)).toBeVisible();
  });

  it('should show error when focus is lost (onBlur)', async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const loginInput = screen.getByRole('textbox', { name: DISPLAY.LABELS.EMAIL });

    await user.type(loginInput, 'not-an-email');
    await user.tab();

    const emailError = await screen.findByText(MESSAGES.VALIDATION.EMAIL_INVALID);
    expect(emailError).toBeVisible();
  });

  it('should display required error messages on form submission with empty values', async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const submit = screen.getByRole('button', { name: DISPLAY.ACTIONS.LOGIN });

    await user.click(submit);

    const emailRequiredError = await screen.findByText(MESSAGES.VALIDATION.EMAIL_REQUIRED);
    const passwordRequiredError = await screen.findByText(MESSAGES.VALIDATION.PASSWORD_REQUIRED);

    expect(emailRequiredError).toBeVisible();
    expect(passwordRequiredError).toBeVisible();
  });

  it('should display validation error messages on form submission and submit and not call submit', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    renderLoginForm({ handleSubmit });

    const loginInput = screen.getByRole('textbox', { name: DISPLAY.LABELS.EMAIL });
    const passWordInput = screen.getByLabelText(DISPLAY.LABELS.PASSWORD);
    const submit = screen.getByRole('button', { name: DISPLAY.ACTIONS.LOGIN });

    await user.type(loginInput, 'not-an-email');
    await user.type(passWordInput, '123');
    await user.click(submit);

    const emailInvalidError = await screen.findByText(MESSAGES.VALIDATION.EMAIL_INVALID);
    const passwordMinError = await screen.findByText(MESSAGES.VALIDATION.PASSWORD_MIN);

    expect(emailInvalidError).toBeVisible();
    expect(passwordMinError).toBeVisible();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('should call handleSubmit with the entered values when the form is valid', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    renderLoginForm({ handleSubmit });

    const loginInput = screen.getByRole('textbox', { name: DISPLAY.LABELS.EMAIL });
    const passWordInput = screen.getByLabelText(DISPLAY.LABELS.PASSWORD);
    const submit = screen.getByRole('button', { name: DISPLAY.ACTIONS.LOGIN });

    await user.type(loginInput, 'user@example.com');
    await user.type(passWordInput, 'Password123');
    await user.click(submit);

    expect(handleSubmit).toHaveBeenCalledWith(
      { email: 'user@example.com', password: 'Password123' },
      expect.anything(),
    );
  });

  it('should call onRegisterClick when the register link is clicked', async () => {
    const onRegisterClick = jest.fn();
    const user = userEvent.setup();
    renderLoginForm({ onRegisterClick });

    const registerLink = screen.getByText(DISPLAY.ACTIONS.GO_TO_REGISTER);
    await user.click(registerLink);

    expect(onRegisterClick).toHaveBeenCalledTimes(1);
  });
});
