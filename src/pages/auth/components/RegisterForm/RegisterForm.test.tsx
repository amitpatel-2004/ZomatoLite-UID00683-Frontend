import { Formik } from 'formik';

import { USER_ROLES } from '@constants/auth.constants';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RegisterForm } from './RegisterForm';

import '@testing-library/jest-dom';

const renderRegisterForm = (
  formikProps: { initialErrors?: object; initialTouched?: object } = {},
  props: { onLoginClick?: () => void } = {},
) =>
  render(
    <Formik
      initialValues={{
        confirmPassword: '',
        displayName: '',
        email: '',
        password: '',
        role: USER_ROLES.CUSTOMER,
      }}
      onSubmit={jest.fn()}
      {...formikProps}
    >
      <RegisterForm isLoading={false} onLoginClick={props.onLoginClick ?? jest.fn()} />
    </Formik>,
  );

describe('RegisterForm', () => {
  it('should render all form fields', () => {
    renderRegisterForm();

    expect(screen.getByPlaceholderText('Enter your full name')).toBeVisible();
    expect(screen.getByPlaceholderText('Enter your email address')).toBeVisible();
    expect(screen.getByPlaceholderText('Create a strong password')).toBeVisible();
    expect(screen.getByPlaceholderText('Re-enter your password')).toBeVisible();
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

  it('shows a validation error when a field is touched', () => {
    renderRegisterForm({
      initialErrors: { displayName: MESSAGES.VALIDATION.DISPLAY_NAME_REQUIRED },
      initialTouched: { displayName: true },
    });

    expect(screen.getByText(MESSAGES.VALIDATION.DISPLAY_NAME_REQUIRED)).toBeVisible();
  });

  it('should call onLoginClick when the login link is clicked', async () => {
    const onLoginClick = jest.fn();
    const user = userEvent.setup();

    renderRegisterForm({}, { onLoginClick });

    await user.click(screen.getByText(DISPLAY.ACTIONS.GO_TO_LOGIN));

    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });
});
