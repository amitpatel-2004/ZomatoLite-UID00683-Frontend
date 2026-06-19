import { MESSAGES } from '@constants/message.constants';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { VerifyEmailContainer } from './VerifyEmailContainer';
import { useVerifyEmail } from '../hooks/useVerifyEmail';

import '@testing-library/jest-dom';

jest.mock('../hooks/useVerifyEmail', () => ({
  useVerifyEmail: jest.fn(),
}));

const mockUseVerifyEmail = jest.mocked(useVerifyEmail);

const defaultMock = {
  localEmail: null as string | null,
  isResending: false,
  resendStatus: 'sending' as const,
  handleResend: jest.fn() as () => Promise<void>,
};

describe('VerifyEmailContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseVerifyEmail.mockReturnValue(defaultMock);
  });

  it('should render the resend button', () => {
    render(<VerifyEmailContainer />);

    expect(screen.getByRole('button', { name: MESSAGES.LABELS.RESEND_VERIFICATION })).toBeVisible();
  });

  it('should show the user email when available', () => {
    mockUseVerifyEmail.mockReturnValue({ ...defaultMock, localEmail: 'user@example.com' });

    render(<VerifyEmailContainer />);

    expect(screen.getByText('user@example.com')).toBeVisible();
  });

  it('should not show email text when localEmail is null', () => {
    render(<VerifyEmailContainer />);

    expect(screen.queryByText('@')).not.toBeInTheDocument();
  });

  it('should show success alert when verification email was resent', () => {
    mockUseVerifyEmail.mockReturnValue({ ...defaultMock, resendStatus: 'sent' as const });

    render(<VerifyEmailContainer />);

    expect(screen.getByText(MESSAGES.AUTH.EMAIL_VERIFICATION_RESENT)).toBeVisible();
  });

  it('should shows error alert when resend failed', () => {
    mockUseVerifyEmail.mockReturnValue({ ...defaultMock, resendStatus: 'error' as const });

    render(<VerifyEmailContainer />);

    expect(screen.getByText(MESSAGES.ERRORS.GENERIC)).toBeVisible();
  });

  it('should call handleResend when the button is clicked', async () => {
    const handleResend = jest.fn() as () => Promise<void>;
    mockUseVerifyEmail.mockReturnValue({ ...defaultMock, handleResend });
    const user = userEvent.setup();

    render(<VerifyEmailContainer />);
    await user.click(screen.getByRole('button'));

    expect(handleResend).toHaveBeenCalledTimes(1);
  });
});
