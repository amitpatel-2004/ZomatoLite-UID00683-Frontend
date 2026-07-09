export const CSV_ACCEPTED_TYPE = '.csv,text/csv';

export const CSV_MAX_SIZE_BYTES = 1 * 1024 * 1024;

export const CSV_REQUIRED_COLUMNS = ['name', 'price', 'is_veg'] as const;

export const CSV_FIELD_LIMITS = {
  NAME_MAX_LENGTH: 100,
  PRICE_MAX: 9999.99,
  QUANTITY_MAX: 9999,
} as const;
