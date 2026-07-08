import type { FieldInputProps, FormikProps } from 'formik';

import type { ValueOf } from '@appTypes/common.types';
import { SELECT_MODES } from '@constants/style.constants';

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectFieldProps = {
  field: FieldInputProps<string | string[]>;
  form: FormikProps<unknown>;
  label: string;
  options: readonly SelectOption[];
  mode?: ValueOf<typeof SELECT_MODES>;
  placeholder?: string;
  required?: boolean;
};
