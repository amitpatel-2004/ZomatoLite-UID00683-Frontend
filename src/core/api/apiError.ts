export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const isApiErrorWithStatus = (error: unknown, status: number): error is ApiError => {
  return error instanceof ApiError && error.status === status;
};
