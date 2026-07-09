import { MESSAGES as SHARED_MESSAGES } from '@constants/message.constants';
import { USER_ROLES } from '@pages/auth/constants/auth.constants';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { authService } from '@services/auth/authService';
import type { AuthUser } from '@services/auth/authService.types';
import { renderWithStore } from '@test/utils/renderWithStore';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { VerifyEmailContainer } from './VerifyEmailContainer';

import '@testing-library/jest-dom';

jest.mock('@services/auth/authService', () => {
  return {
    authService: {
      login: jest.fn(),
      register: jest.fn(),
      resendVerification: jest.fn(),
      logout: jest.fn(),
    },
  };
});

const mockResendVerification = jest.mocked(authService.resendVerification);

const mockUser: AuthUser = {
  _id: '1',
  email: 'user@example.com',
  displayName: 'Test',
  role: USER_ROLES.CUSTOMER,
  balance: 0,
  currency: { code: 'INR', symbol: '₹' },
};

describe('VerifyEmailContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the resend button and email of the user', () => {
    renderWithStore(<VerifyEmailContainer />, {
      auth: {
        user: mockUser,
        idToken: null,
        isLoading: false,
        isEmailVerified: false,
        isFirebaseInitializing: false,
        error: null,
      },
    });

    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.RESEND_VERIFICATION })).toBeVisible();
    expect(screen.getByText('user@example.com')).toBeVisible();
  });

  it('should show a success alert and call resendVerification when Resend is clicked', async () => {
    const user = userEvent.setup();

    renderWithStore(<VerifyEmailContainer />);
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.RESEND_VERIFICATION }));

    expect(await screen.findByText(MESSAGES.SUCCESS.EMAIL_VERIFICATION_RESENT)).toBeVisible();
    expect(mockResendVerification).toHaveBeenCalledTimes(1);
  });

  it('should show an error alert when resend fails', async () => {
    mockResendVerification.mockRejectedValue(new Error('Not logged in.'));
    const user = userEvent.setup();

    renderWithStore(<VerifyEmailContainer />);
    await user.click(screen.getByRole('button', { name: DISPLAY.ACTIONS.RESEND_VERIFICATION }));

    expect(await screen.findByText(SHARED_MESSAGES.ERRORS.GENERIC)).toBeVisible();
  });
});
