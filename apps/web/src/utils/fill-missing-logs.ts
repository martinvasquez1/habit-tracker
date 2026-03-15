import { v4 as uuidv4 } from "uuid";

import { generateDateArray } from "./generate-date-array";
import { Log, LogStatusEnum } from "@repo/open-api";

function generateRandomNumericId(): number {
  const uuid = uuidv4();
  const numericId = parseInt(uuid.replace(/-/g, "").slice(0, 15), 16);
  return numericId;
}

export function fillMissingLogs(
  logs: Log[],
  habitId: number,
  startDate: Date,
  endDate: Date
): Log[] {
  const days = generateDateArray(startDate, endDate);
  const allLogs = [];

  for (const day of days) {
    const existLogForDate = logs.find((log) => log.date === day);

    if (existLogForDate) {
      allLogs.push(existLogForDate);
    } else {
      const fakeLog = {
        date: day,
        status: LogStatusEnum.MISSED,
        id: generateRandomNumericId(),
        habitId,
      } as Log;

      allLogs.push(fakeLog);
    }
  }

  return allLogs;
}
