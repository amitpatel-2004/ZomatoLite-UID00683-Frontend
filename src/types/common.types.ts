/**
 * Extracts the value types of an object.
 */
export type ValueOf<T> = T[keyof T];

export type Currency = {
  code: string;
  symbol: string;
};

export type PaginatedResult<T> = {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type ApiListResponse<T> = {
  message: string;
  data: PaginatedResult<T>;
};

export type ApiEntityResponse<T> = {
  message: string;
  data: T;
};
