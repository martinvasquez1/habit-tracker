/**
 * Adjusts the given date by a specified number of days.
 *
 * @param date - Starting date.
 * @param n - Number of days.
 *
 * @returns A new Date object adjusted by the specified number of days.
 */
export default function shiftDateByDays(date: Date, n: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + n);
  return newDate;
}
