import type { MenuItem } from '@appTypes/restaurant.types';

export type MenuItemFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: MenuItemFormSubmitValues) => Promise<void>;
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
