import type { ResultStatusType } from 'antd/lib/result';

export type ErrorComponentProps = {
  status?: ResultStatusType;
  title?: string;
  subTitle?: string;
  buttonText?: string;
  onAction?: () => void;
};
