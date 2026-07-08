/**
 * Capitalizes the first letter of a string.
 *
 * @param value - The string to capitalize.
 * @returns The string with its first letter uppercased.
 */
export const capitalize = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
