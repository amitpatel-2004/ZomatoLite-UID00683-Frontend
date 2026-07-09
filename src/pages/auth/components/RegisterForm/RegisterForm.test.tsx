import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RegisterForm } from './RegisterForm';

import '@testing-library/jest-dom';

const renderRegisterForm = (
  props: { handleSubmit?: jest.Mock; onLoginClick?: () => void } = {},
) => {
  return render(
    <RegisterForm
      handleSubmit={props.handleSubmit ?? jest.fn()}
      isLoading={false}
      onLoginClick={props.onLoginClick ?? jest.fn()}
    />,
  );
};

const fillForm = async (
  user: ReturnType<typeof userEvent.setup>,
  values: { displayName?: string; email?: string; password?: string; confirmPassword?: string },
  clickOwner = false,
  clickCustomer = false,
) => {
  if (values.displayName)
    await user.type(
      screen.getByRole('textbox', { name: DISPLAY.LABELS.DISPLAY_NAME }),
      values.displayName,
    );
  if (values.email)
    await user.type(screen.getByRole('textbox', { name: DISPLAY.LABELS.EMAIL }), values.email);
  if (values.password)
    await user.type(screen.getByLabelText(DISPLAY.LABELS.PASSWORD), values.password);
  if (values.confirmPassword)
    await user.type(screen.getByLabelText(DISPLAY.LABELS.CONFIRM_PASSWORD), values.confirmPassword);
  if (clickOwner) await user.click(screen.getByRole('radio', { name: DISPLAY.LABELS.ROLE_OWNER }));
  if (clickCustomer)
    await user.click(screen.getByRole('radio', { name: DISPLAY.LABELS.ROLE_CUSTOMER }));
};

describe('RegisterForm', () => {
  it('should render all form fields, buttons and links', () => {
    renderRegisterForm();

    expect(screen.getByRole('textbox', { name: DISPLAY.LABELS.DISPLAY_NAME })).toBeVisible();
    expect(screen.getByRole('textbox', { name: DISPLAY.LABELS.EMAIL })).toBeVisible();
    expect(screen.getByLabelText(DISPLAY.LABELS.PASSWORD)).toBeVisible();
    expect(screen.getByLabelText(DISPLAY.LABELS.CONFIRM_PASSWORD)).toBeVisible();
    expect(screen.getByRole('radio', { name: DISPLAY.LABELS.ROLE_CUSTOMER })).toBeVisible();
    expect(screen.getByRole('radio', { name: DISPLAY.LABELS.ROLE_OWNER })).toBeVisible();
    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.REGISTER })).toBeVisible();
    expect(screen.getByText(DISPLAY.ACTIONS.GO_TO_LOGIN)).toBeVisible();
  });

  it('should show error when focus is lost (onBlur)', async () => {
    const user = userEvent.setup();
    renderRegisterForm();

    await user.type(screen.getByRole('textbox', { name: DISPLAY.LABELS.EMAIL }), 'not-an-email');
    await user.tab();

    expect(await screen.findByText(MESSAGES.VALIDATION.EMAIL_INVALID)).toBeVisible();
  });

  it('should display required error messages on form submission with empty values', async () => {
    const user = userEvent.setup();
    renderRegisterForm();

    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.REGISTER }));

    expect(await screen.findByText(MESSAGES.VALIDATION.EMAIL_REQUIRED)).toBeVisible();
    expect(await screen.findByText(MESSAGES.VALIDATION.PASSWORD_REQUIRED)).toBeVisible();
    expect(await screen.findByText(MESSAGES.VALIDATION.DISPLAY_NAME_REQUIRED)).toBeVisible();
  });

  it('should display validation error messages on form submission and should not submit', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    renderRegisterForm({ handleSubmit });

    await fillForm(user, {
      displayName: 'user@123',
      email: 'not-an-email',
      password: '123',
      confirmPassword: '1234',
    });
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.REGISTER }));

    expect(await screen.findByText(MESSAGES.VALIDATION.DISPLAY_NAME_PATTERN)).toBeVisible();
    expect(await screen.findByText(MESSAGES.VALIDATION.EMAIL_INVALID)).toBeVisible();
    expect(await screen.findByText(MESSAGES.VALIDATION.PASSWORD_MIN)).toBeVisible();
    expect(await screen.findByText(MESSAGES.VALIDATION.PASSWORD_MISMATCH)).toBeVisible();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('should call handleSubmit with the entered values when the form is valid', async () => {
    const handleSubmit = jest.fn();
    const user = userEvent.setup();
    renderRegisterForm({ handleSubmit });

    await fillForm(
      user,
      {
        displayName: 'user',
        email: 'user@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
      },
      true,
    );
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.REGISTER }));

    expect(handleSubmit).toHaveBeenCalledWith(
      {
        displayName: 'user',
        email: 'user@example.com',
        confirmPassword: 'Password123',
        password: 'Password123',
        role: USER_ROLES.OWNER,
      },
      expect.anything(),
    );
  });

  it('should call onLoginClick when the login link is clicked', async () => {
    const onLoginClick = jest.fn();
    const user = userEvent.setup();
    renderRegisterForm({ onLoginClick });

    await user.click(screen.getByText(DISPLAY.ACTIONS.GO_TO_LOGIN));

    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });
});
