import type { FormikProps } from 'formik';

import type { RegisterFormValues } from '@appTypes/auth.types';
import { MESSAGES } from '@constants/message.constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RegisterForm } from './RegisterForm';

import '@testing-library/jest-dom';

const buildFormik = (
  overrides: {
    errors?: Partial<RegisterFormValues>;
    touched?: Partial<Record<keyof RegisterFormValues, boolean>>;
  } = {},
): FormikProps<RegisterFormValues> =>
  ({
    values: { displayName: '', email: '', password: '', confirmPassword: '', role: 'customer' },
    errors: overrides.errors ?? {},
    touched: overrides.touched ?? {},
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
  }) as unknown as FormikProps<RegisterFormValues>;

describe('RegisterForm', () => {
  it('should render all form fields', () => {
    render(<RegisterForm formik={buildFormik()} isLoading={false} onLoginClick={jest.fn()} />);

    expect(screen.getByPlaceholderText('Enter your full name')).toBeVisible();
    expect(screen.getByPlaceholderText('Enter your email address')).toBeVisible();
    expect(screen.getByPlaceholderText('Create a strong password')).toBeVisible();
    expect(screen.getByPlaceholderText('Re-enter your password')).toBeVisible();
  });

  it('should render role radio buttons', () => {
    render(<RegisterForm formik={buildFormik()} isLoading={false} onLoginClick={jest.fn()} />);

    expect(screen.getByText(MESSAGES.LABELS.ROLE_CUSTOMER)).toBeVisible();
    expect(screen.getByText(MESSAGES.LABELS.ROLE_OWNER)).toBeVisible();
  });

  it('should render the submit button and login link', () => {
    render(<RegisterForm formik={buildFormik()} isLoading={false} onLoginClick={jest.fn()} />);

    expect(screen.getByRole('button', { name: MESSAGES.LABELS.REGISTER })).toBeVisible();
    expect(screen.getByText(MESSAGES.LABELS.GO_TO_LOGIN)).toBeVisible();
  });

  it('shows a validation error when a field is touched', () => {
    render(
      <RegisterForm
        formik={buildFormik({
          errors: { displayName: MESSAGES.VALIDATION.DISPLAY_NAME_REQUIRED },
          touched: { displayName: true },
        })}
        isLoading={false}
        onLoginClick={jest.fn()}
      />,
    );

    expect(screen.getByText(MESSAGES.VALIDATION.DISPLAY_NAME_REQUIRED)).toBeVisible();
  });

  it('should call onLoginClick when the login link is clicked', async () => {
    const onLoginClick = jest.fn();
    const user = userEvent.setup();

    render(<RegisterForm formik={buildFormik()} isLoading={false} onLoginClick={onLoginClick} />);

    await user.click(screen.getByText(MESSAGES.LABELS.GO_TO_LOGIN));

    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });
});
