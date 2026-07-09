import React from 'react';

import { Field } from 'formik';

import { SelectField } from '@components/FormFields/SelectField';
import { TextAreaField } from '@components/FormFields/TextAreaField';
import { TextField } from '@components/FormFields/TextField';
import { TimeField } from '@components/FormFields/TimeField';
import { FormModal } from '@components/FormModal';
import { MODAL_WIDTHS } from '@constants/style.constants';
import { DISPLAY } from '@pages/restaurants/constants/display.constants';

import { getRestaurantInitialValues, RESTAURANT_FIELD_CONFIGS } from './RestaurantForm.constants';
import { restaurantValidationSchema } from './RestaurantForm.schema';
import type { RestaurantFormProps } from './RestaurantForm.types';

export const RestaurantForm = (props: RestaurantFormProps): React.JSX.Element => {
  const { initialValues, isSubmitting, onClose, handleSubmit, open } = props;

  const title = initialValues ? DISPLAY.TITLES.EDIT_RESTAURANT : DISPLAY.TITLES.CREATE_RESTAURANT;

  return (
    <FormModal
      initialValues={getRestaurantInitialValues(initialValues ?? null)}
      isSubmitting={isSubmitting}
      okText={DISPLAY.ACTIONS.SAVE}
      onClose={onClose}
      onSubmit={handleSubmit}
      open={open}
      title={title}
      validationSchema={restaurantValidationSchema}
      width={MODAL_WIDTHS.MEDIUM}
    >
      <Field {...RESTAURANT_FIELD_CONFIGS.NAME} component={TextField} />
      <Field {...RESTAURANT_FIELD_CONFIGS.DESCRIPTION} component={TextAreaField} />
      <Field {...RESTAURANT_FIELD_CONFIGS.CUISINE_TYPES} component={SelectField} />
      <Field {...RESTAURANT_FIELD_CONFIGS.OPENING_TIME} component={TimeField} />
      <Field {...RESTAURANT_FIELD_CONFIGS.CLOSING_TIME} component={TimeField} />
    </FormModal>
  );
};
