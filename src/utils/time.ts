/** Converts a 24-hour "HH:mm" string to 12-hour "h:mm AM/PM" string. */
export const formatTo12Hour = (time: string): string => {
  const [hourStr, minute] = time.split(':');
  const hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${period}`;
};
