export const MESSAGES = {
  SUCCESS: {
    RESTAURANT_CREATED: 'Restaurant created.',
    RESTAURANT_UPDATED: 'Restaurant updated.',
    RESTAURANT_DELETED: 'Restaurant deleted.',
    MENU_ITEM_CREATED: 'Menu item added.',
    MENU_ITEM_UPDATED: 'Menu item updated.',
    MENU_ITEM_DELETED: 'Menu item deleted.',
    ORDER_PLACED: 'Order placed successfully.',
    ORDER_CANCELLED: 'Order cancelled.',
    ORDER_STATUS_UPDATED: 'Order status updated.',
    CSV_UPLOADED: 'File uploaded and in process, you will get email for results shortly.',
  },
  ERRORS: {
    FETCH_FAILED: 'Could not load restaurants.',
    FETCH_MORE_FAILED: 'Could not load more restaurants.',
    CREATE_FAILED: 'Could not create the restaurant.',
    UPDATE_FAILED: 'Could not update the restaurant.',
    DELETE_FAILED: 'Could not delete the restaurant.',
    MENU_LOAD_FAILED: 'Could not load menu items.',
    MENU_MORE_FAILED: 'Could not load more menu items.',
    MENU_ITEM_SAVE_FAILED: 'Could not save menu item.',
    MENU_ITEM_DELETE_FAILED: 'Could not delete menu item.',
    IMAGE_UPLOAD_FAILED: 'Image upload failed.',
    BROWSE_LOAD_FAILED: 'Could not load restaurants.',
    ORDER_PLACE_FAILED: 'Could not place your order.',
    ORDER_CANCEL_FAILED: 'Could not cancel the order.',
    ORDER_STATUS_UPDATE_FAILED: 'Could not update the order status.',
    ORDERS_LOAD_FAILED: 'Could not load orders.',
    ORDER_NOT_FOUND: 'Order not found.',
    CSV_UPLOAD_FAILED: 'Could not upload the file. Please try again.',
    CSV_FILE_SIZE_EXCEEDED: 'File size exceeds the 1 MB limit. Try smaller file.',
    CSV_MISSING_COLUMNS: 'CSV is missing required columns: name, price, is_veg.',
    CSV_EMPTY_FILE: 'CSV file has no data rows.',
    CSV_VALIDATION_FAILED: 'This file has some problems. Please fix them and try again.',
    CSV_ROW_EMPTY_NAME: (row: number) => {
      return `Row ${row}: name is required.`;
    },
    CSV_ROW_NAME_TOO_LONG: (row: number) => {
      return `Row ${row}: name must be at most 100 characters.`;
    },
    CSV_ROW_DUPLICATE_NAME: (row: number) => {
      return `Row ${row}: duplicate name.`;
    },
    CSV_ROW_INVALID_PRICE: (row: number) => {
      return `Row ${row}: price must be a number greater than 0 and at most 9999.99.`;
    },
    CSV_ROW_INVALID_IS_VEG: (row: number) => {
      return `Row ${row}: is_veg must be true or false.`;
    },
    CSV_ROW_INVALID_QUANTITY: (row: number) => {
      return `Row ${row}: quantity must be a whole number from 0 to 9999.`;
    },
  },
  VALIDATION: {
    NAME_REQUIRED: 'Name is required.',
    NAME_MAX: 'Name must be at most 100 characters.',
    CUISINE_TYPES_REQUIRED: 'Please select at least one cuisine type.',
    OPENING_TIME_REQUIRED: 'Opening time is required.',
    CLOSING_TIME_REQUIRED: 'Closing time is required.',
    TIME_FORMAT_INVALID: 'Time must be in HH:MM (24-hour) format.',
    PRICE_REQUIRED: 'Price is required.',
    PRICE_INVALID: 'Price must be a number.',
    PRICE_POSITIVE: 'Price must be greater than 0.',
    QUANTITY_INVALID: 'Quantity must be a number.',
    QUANTITY_INTEGER: 'Quantity must be a whole number.',
    QUANTITY_NEGATIVE: 'Quantity cannot be negative.',
    QUANTITY_MAX: 'Quantity cannot exceed 9999.',
  },
} as const;
