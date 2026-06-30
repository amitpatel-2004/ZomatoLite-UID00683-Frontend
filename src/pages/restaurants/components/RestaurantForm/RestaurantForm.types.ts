import type { Restaurant } from '@appTypes/restaurant.types';

export type RestaurantFormValues = {
  name: string;
  description: string;
  cuisineTypes: string[];
  openingTime: string;
  closingTime: string;
};

export type RestaurantFormProps = {
  open: boolean;
  onClose: () => void;
  handleSubmit: (
    values: RestaurantFormValues,
    setFieldError: (field: string, message: string) => void,
  ) => Promise<void>;
  initialValues?: Restaurant | null;
  isSubmitting: boolean;
};
