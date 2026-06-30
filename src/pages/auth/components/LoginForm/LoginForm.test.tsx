import { DISPLAY } from '@pages/auth/constants/display.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './LoginForm';

import '@testing-library/jest-dom';

const renderLoginForm = (props: { onRegisterClick?: () => void } = {}) => {
  return render(
    <LoginForm
      handleSubmit={jest.fn()}
      isLoading={false}
      onRegisterClick={props.onRegisterClick ?? jest.fn()}
    />,
  );
};

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

  it('should show email validation error after submit with empty field', () => {
    renderLoginForm();

    expect(screen.queryByText(MESSAGES.VALIDATION.EMAIL_REQUIRED)).not.toBeInTheDocument();
  });

  it('should call onRegisterClick when the register link is clicked', async () => {
    const onRegisterClick = jest.fn();
    const user = userEvent.setup();

    renderLoginForm({ onRegisterClick });

    await user.click(screen.getByText(DISPLAY.ACTIONS.GO_TO_REGISTER));

    expect(onRegisterClick).toHaveBeenCalledTimes(1);
  });
});
