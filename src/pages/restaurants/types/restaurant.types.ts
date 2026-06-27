export type RestaurantFormValues = {
  name: string;
  description: string;
  cuisineTypes: string[];
  openingTime: string;
  closingTime: string;
};

export type MenuItemFormValues = {
  name: string;
  description: string;
  price: number | string;
  isVeg: boolean;
  quantity: number | string | null;
  imageFile: File | null;
};
