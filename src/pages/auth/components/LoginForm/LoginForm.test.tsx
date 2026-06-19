import type { FormikProps } from 'formik';

import type { LoginFormValues } from '@appTypes/auth.types';
import { MESSAGES } from '@constants/message.constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './LoginForm';

import '@testing-library/jest-dom';

const buildFormik = (
  overrides: {
    errors?: Partial<LoginFormValues>;
    touched?: Partial<Record<keyof LoginFormValues, boolean>>;
  } = {},
): FormikProps<LoginFormValues> =>
  ({
    values: { email: '', password: '' },
    errors: overrides.errors ?? {},
    touched: overrides.touched ?? {},
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
  }) as unknown as FormikProps<LoginFormValues>;

describe('LoginForm', () => {
  it('should render email and password inputs', () => {
    render(<LoginForm formik={buildFormik()} isLoading={false} onRegisterClick={jest.fn()} />);

    expect(screen.getByPlaceholderText('Enter your email address')).toBeVisible();
    expect(screen.getByPlaceholderText('Enter your password')).toBeVisible();
  });

  it('should render the submit button and register link', () => {
    render(<LoginForm formik={buildFormik()} isLoading={false} onRegisterClick={jest.fn()} />);

    expect(screen.getByRole('button', { name: MESSAGES.LABELS.LOGIN })).toBeVisible();
    expect(screen.getByText(MESSAGES.LABELS.GO_TO_REGISTER)).toBeVisible();
  });

  it('should show email validation error when the field is touched', () => {
    render(
      <LoginForm
        formik={buildFormik({
          errors: { email: MESSAGES.VALIDATION.EMAIL_REQUIRED },
          touched: { email: true },
        })}
        isLoading={false}
        onRegisterClick={jest.fn()}
      />,
    );

    expect(screen.getByText(MESSAGES.VALIDATION.EMAIL_REQUIRED)).toBeVisible();
  });

  it('should show password validation error when the field is touched', () => {
    render(
      <LoginForm
        formik={buildFormik({
          errors: { password: MESSAGES.VALIDATION.PASSWORD_REQUIRED },
          touched: { password: true },
        })}
        isLoading={false}
        onRegisterClick={jest.fn()}
      />,
    );

    expect(screen.getByText(MESSAGES.VALIDATION.PASSWORD_REQUIRED)).toBeVisible();
  });

  it('should call onRegisterClick when the register link is clicked', async () => {
    const onRegisterClick = jest.fn();
    const user = userEvent.setup();

    render(
      <LoginForm formik={buildFormik()} isLoading={false} onRegisterClick={onRegisterClick} />,
    );

    await user.click(screen.getByText(MESSAGES.LABELS.GO_TO_REGISTER));

    expect(onRegisterClick).toHaveBeenCalledTimes(1);
  });
});
