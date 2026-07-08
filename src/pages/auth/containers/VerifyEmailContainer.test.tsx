import { MESSAGES as SHARED_MESSAGES } from '@constants/message.constants';
import { DISPLAY } from '@pages/auth/constants/display.constants';
import { MESSAGES } from '@pages/auth/constants/messages.constants';
import { useAuth } from '@pages/auth/hooks/useAuth';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { VerifyEmailContainer } from './VerifyEmailContainer';

import '@testing-library/jest-dom';

jest.mock('@pages/auth/hooks/useAuth', () => {
  return {
    useAuth: jest.fn(),
  };
});

const mockUseAuth = jest.mocked(useAuth);

const defaultMock = {
  isEmailVerified: false,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
  resendVerification: jest.fn().mockResolvedValue(undefined),
  user: null,
};

describe('VerifyEmailContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue(defaultMock);
  });

  it('should render the resend button', () => {
    render(<VerifyEmailContainer />);

    expect(screen.getByRole('button', { name: DISPLAY.ACTIONS.RESEND_VERIFICATION })).toBeVisible();
  });

  it('should show the user email when available', () => {
    mockUseAuth.mockReturnValue({
      ...defaultMock,
      user: {
        _id: '1',
        email: 'user@example.com',
        displayName: 'Test',
        role: 'customer',
        balance: 0,
        currency: { code: 'INR', symbol: '₹' },
      },
    });

    render(<VerifyEmailContainer />);

    expect(screen.getByText('user@example.com')).toBeVisible();
  });

  it('should not show email text when localEmail is null', () => {
    render(<VerifyEmailContainer />);

    expect(screen.queryByText('@')).not.toBeInTheDocument();
  });

  it('should show success alert when verification email was resent', async () => {
    mockUseAuth.mockReturnValue({
      ...defaultMock,
      resendVerification: jest.fn().mockResolvedValue(undefined),
    });
    const user = userEvent.setup();

    render(<VerifyEmailContainer />);

    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(MESSAGES.SUCCESS.EMAIL_VERIFICATION_RESENT)).toBeVisible();
    });
  });

  it('should show error alert when resend failed', async () => {
    mockUseAuth.mockReturnValue({
      ...defaultMock,
      resendVerification: jest.fn().mockRejectedValue(new Error('fail')),
    });
    const user = userEvent.setup();

    render(<VerifyEmailContainer />);
    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(SHARED_MESSAGES.ERRORS.GENERIC)).toBeVisible();
    });
  });

  it('should call resendVerification when the button is clicked', async () => {
    const mockResend = jest.fn().mockResolvedValue(undefined);
    mockUseAuth.mockReturnValue({ ...defaultMock, resendVerification: mockResend });
    const user = userEvent.setup();

    render(<VerifyEmailContainer />);
    await user.click(screen.getByRole('button'));

    expect(mockResend).toHaveBeenCalledTimes(1);
  });
});
