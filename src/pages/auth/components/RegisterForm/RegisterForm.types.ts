import type { UserRole } from '@pages/auth/types/auth.types';

export type RegisterFormValues = {
  confirmPassword: string;
  displayName: string;
  email: string;
  password: string;
  role: UserRole;
};

export type RegisterFormProps = {
  isLoading: boolean;
  handleSubmit: (value: RegisterFormValues) => Promise<void>;
  onLoginClick: () => void;
};
