import { formatYYYYMMDD } from "./format-yyyy-mm-dd";

export function generateDateArray(startDate: Date, endDate: Date): string[] {
  const dateArray = [];

  const timeDiff = endDate.getTime() - startDate.getTime();
  const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  for (let i = 0; i <= numberOfDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const final = formatYYYYMMDD(currentDate);

    dateArray.push(final);
  }

  return dateArray;
}
