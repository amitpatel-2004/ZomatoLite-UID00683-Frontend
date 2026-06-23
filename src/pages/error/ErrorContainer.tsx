import React from 'react';

import { useNavigate } from 'react-router-dom';

import { ErrorComponent } from '@components/ErrorComponent';
import { ERROR_PAGE_DEFAULTS } from '@components/ErrorComponent/ErrorComponent.constants';

import type { ErrorContainerProps } from './ErrorContainer.types';

export const ErrorContainer = (props: ErrorContainerProps): React.JSX.Element => {
  const { redirectTo = ERROR_PAGE_DEFAULTS.REDIRECT_TO, ...rest } = props;
  const navigate = useNavigate();

  return <ErrorComponent {...rest} onAction={() => navigate(redirectTo)} />;
};
