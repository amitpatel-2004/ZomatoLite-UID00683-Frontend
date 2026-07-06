import { MS_PER_SECOND, SECONDS_PER_MINUTE } from '@constants/app.constants';

/**
 * Converts a 24-hour "HH:mm" string to 12-hour "h:mm AM/PM" string.
 *
 * @param time - The 24-hour time string to format (e.g., "14:30").
 * @returns The formatted 12-hour time string (e.g., "2:30 PM").
 */
export const formatTo12Hour = (time: string): string => {
  const [hourStr, minute] = time.split(':');
  const hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${period}`;
};

/**
 * Formats a duration in milliseconds as a "M:SS" clock string.
 *
 * @param ms - The duration in milliseconds (e.g., 307000).
 * @returns The formatted clock string (e.g., "5:07").
 */
export const formatClock = (ms: number): string => {
  const totalSeconds = Math.floor(ms / MS_PER_SECOND);
  const minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
  const seconds = totalSeconds % SECONDS_PER_MINUTE;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};
