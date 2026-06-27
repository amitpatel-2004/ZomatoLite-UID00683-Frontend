import type { Restaurant } from '@appTypes/restaurant.types';
import type { RestaurantFormValues } from '@pages/restaurants/types/restaurant.types';

export type RestaurantFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: RestaurantFormValues) => Promise<void>;
  initialValues?: Restaurant | null;
  isSubmitting: boolean;
};
