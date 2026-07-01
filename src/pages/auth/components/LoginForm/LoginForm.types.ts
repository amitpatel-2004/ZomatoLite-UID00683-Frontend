export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  isLoading: boolean;
  handleSubmit: (values: LoginFormValues) => Promise<void>;
  onRegisterClick: () => void;
};
