import type { MenuItem } from '@appTypes/restaurant.types';

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

export type MenuItemFormSubmitValues = {
  name: string;
  description: string;
  price: number;
  isVeg: boolean;
  quantity: number | null;
  imageFile: File | null;
  existingImagePath: string | null;
};
