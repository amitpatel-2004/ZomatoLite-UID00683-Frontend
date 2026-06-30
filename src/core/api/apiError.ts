export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const isConflictError = (error: unknown): error is ApiError => {
  return error instanceof ApiError && error.status === 409;
};
