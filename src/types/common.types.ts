/**
 * Extracts the value types of an object.
 */
export type ValueOf<T> = T[keyof T];

export type Currency = {
  code: string;
  symbol: string;
};
