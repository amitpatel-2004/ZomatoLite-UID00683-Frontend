import type { ErrorComponentProps } from '@components/ErrorComponent';

export type ErrorContainerProps = Omit<ErrorComponentProps, 'onAction'> & {
  redirectTo?: string;
};
