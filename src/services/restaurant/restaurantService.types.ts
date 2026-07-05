export type CreateRestaurantPayload = {
  name: string;
  description: string;
  cuisineTypes: string[];
  openingTime: string;
  closingTime: string;
};

export type UpdateRestaurantPayload = Partial<CreateRestaurantPayload>;
