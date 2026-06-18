import type { ResultStatusType } from 'antd/lib/result';

export interface ErrorLayoutProps {
  status?: ResultStatusType;
  title?: string;
  subTitle?: string;
  buttonText?: string;
  redirectTo?: string;
}
