import type { ResultStatusType } from 'antd/lib/result';

/**
 * Configuration properties for the ErrorPage component.
 */
export interface ErrorPageProps {
  status?: ResultStatusType;
  title?: string;
  subTitle?: string;
  buttonText?: string;
  /** Application route path the primary button redirects to when clicked */
  redirectTo?: string;
}
