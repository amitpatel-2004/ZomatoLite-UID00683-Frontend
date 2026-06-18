import type { ResultStatusType } from 'antd/lib/result';

/** Props for the ErrorPage component. */
export interface ErrorPageProps {
  status?: ResultStatusType;
  title?: string;
  subTitle?: string;
  buttonText?: string;
  /** Route path the primary button redirects to. */
  redirectTo?: string;
}
