import type { ResultStatusType } from 'antd/lib/result';

export interface ErrorPageProps {
  status?: ResultStatusType;
  title?: string;
  subTitle?: string;
  buttonText?: string;
  /** Application route path the primary button redirects to when clicked */
  redirectTo?: string;
}
