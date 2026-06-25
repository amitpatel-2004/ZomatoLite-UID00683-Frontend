import { Formik } from 'formik';

import { DISPLAY } from '@pages/auth/constants/display.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './LoginForm';

import '@testing-library/jest-dom';

const renderLoginForm = (
  formikProps: { initialErrors?: object; initialTouched?: object } = {},
  props: { onRegisterClick?: () => void } = {},
) =>
  render(
    <Formik initialValues={{ email: '', password: '' }} onSubmit={jest.fn()} {...formikProps}>
      <LoginForm isLoading={false} onRegisterClick={props.onRegisterClick ?? jest.fn()} />
    </Formik>,
  );

describe('LoginForm', () => {
  it('should render email and password inputs', () => {
    renderLoginForm();

    expect(screen.getByPlaceholderText('Enter your email address')).toBeVisible();
    expect(screen.getByPlaceholderText('Enter your password')).toBeVisible();
  });

  it('should render the submit button and register link', () => {
    renderLoginForm();

    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.LOGIN })).toBeVisible();
    expect(screen.getByText(DISPLAY.ACTIONS.GO_TO_REGISTER)).toBeVisible();
  });

  it('should show email validation error when the field is touched', () => {
    renderLoginForm({
      initialErrors: { email: MESSAGES.VALIDATION.EMAIL_REQUIRED },
      initialTouched: { email: true },
    });

    expect(screen.getByText(MESSAGES.VALIDATION.EMAIL_REQUIRED)).toBeVisible();
  });

  it('should show password validation error when the field is touched', () => {
    renderLoginForm({
      initialErrors: { password: MESSAGES.VALIDATION.PASSWORD_REQUIRED },
      initialTouched: { password: true },
    });

    expect(screen.getByText(MESSAGES.VALIDATION.PASSWORD_REQUIRED)).toBeVisible();
  });

  it('should call onRegisterClick when the register link is clicked', async () => {
    const onRegisterClick = jest.fn();
    const user = userEvent.setup();

    renderLoginForm({}, { onRegisterClick });

    await user.click(screen.getByText(DISPLAY.ACTIONS.GO_TO_REGISTER));

    expect(onRegisterClick).toHaveBeenCalledTimes(1);
  });
});
