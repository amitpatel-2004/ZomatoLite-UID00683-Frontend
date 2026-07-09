import type { MenuItem } from '@pages/restaurants/types/restaurant.types';

export type MenuItemFormProps = {
  open: boolean;
  onClose: () => void;
  handleSubmit: (
    values: MenuItemFormSubmitValues,
    setFieldError: (field: string, message: string) => void,
  ) => Promise<void>;
  initialValues?: MenuItem | null;
  isSubmitting: boolean;
};

export type MenuItemFormValues = {
  name: string;
  description: string;
  price: number | string;
  isVeg: boolean;
  quantity: number | string;
};

export type MenuItemFormSubmitValues = {
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  quantity: number | null;
  imageFile: File | null;
  existingImagePath: string | null;
};
