/**
 * Compares submitted form values against the original value and returns
 * only the fields whose values have actually changed.
 *
 * @param values - The current submitted form values.
 * @param initialValues - The original entity to compare against.
 * @returns A partial object containing only the changed fields.
 */
export const getDirtyValues = <T extends Record<string, unknown>>(
  values: T,
  initialValues: Partial<T>,
): Partial<T> => {
  return Object.fromEntries(
    Object.entries(values).filter(([key, value]) => {
      return JSON.stringify(value) !== JSON.stringify(initialValues[key]);
    }),
  ) as Partial<T>;
};
