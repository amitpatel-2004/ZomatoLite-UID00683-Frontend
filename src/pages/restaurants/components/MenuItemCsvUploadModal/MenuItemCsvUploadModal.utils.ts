import { MESSAGES } from '@pages/restaurants/constants/messages.constants';
import { parseCsv } from '@utils/csv';

import { CSV_FIELD_LIMITS, CSV_REQUIRED_COLUMNS } from './MenuItemCsvUploadModal.constants';

export const validateMenuItemsCsv = (text: string): string[] => {
  const rows = parseCsv(text);
  if (rows.length === 0) return [MESSAGES.ERRORS.CSV_EMPTY_FILE];

  const missingColumns = CSV_REQUIRED_COLUMNS.filter((column) => {
    return !(column in rows[0]);
  });
  if (missingColumns.length > 0) return [MESSAGES.ERRORS.CSV_MISSING_COLUMNS];

  const errors: string[] = [];
  const seenNames = new Set<string>();

  rows.forEach((row, index) => {
    const rowNumber = index + 1;
    const name = row.name;
    const lowerName = name.toLowerCase();

    if (!name) {
      errors.push(MESSAGES.ERRORS.CSV_ROW_EMPTY_NAME(rowNumber));
    } else if (name.length > CSV_FIELD_LIMITS.NAME_MAX_LENGTH) {
      errors.push(MESSAGES.ERRORS.CSV_ROW_NAME_TOO_LONG(rowNumber));
    } else if (seenNames.has(lowerName)) {
      errors.push(MESSAGES.ERRORS.CSV_ROW_DUPLICATE_NAME(rowNumber));
    } else {
      seenNames.add(lowerName);
    }

    const price = Number(row.price);
    if (!row.price || Number.isNaN(price) || price <= 0 || price > CSV_FIELD_LIMITS.PRICE_MAX) {
      errors.push(MESSAGES.ERRORS.CSV_ROW_INVALID_PRICE(rowNumber));
    }

    const isVeg = row.is_veg.toLowerCase();
    if (isVeg !== 'true' && isVeg !== 'false') {
      errors.push(MESSAGES.ERRORS.CSV_ROW_INVALID_IS_VEG(rowNumber));
    }

    if (row.quantity) {
      const quantity = Number(row.quantity);
      if (!Number.isInteger(quantity) || quantity < 0 || quantity > CSV_FIELD_LIMITS.QUANTITY_MAX) {
        errors.push(MESSAGES.ERRORS.CSV_ROW_INVALID_QUANTITY(rowNumber));
      }
    }
  });

  return errors;
};
