import { Injectable } from '@nestjs/common';
import { Log } from 'src/logs/entities/log.entity';

@Injectable()
export class StatsService {
  constructor() {}

  /**
   * Calculates consecutive-day streaks from a list of logs.
   *
   * **Assumes logs are sorted in ascending order.**
   *
   * Example:
   * - Logs: [Jul 1, Jul 2, Jul 3] → [3]
   * - Logs: [Jul 1, Jul 2, Jul 4, Jul 5, Jul 6] → [3, 2]
   *
   * @param logs Array of Log objects
   * @returns Array of streak lengths (most recent streak first).
   */
  calculateStreaks(logs: Log[]): number[] {
    if (logs.length === 0) return [];

    const streaks: number[] = [];
    let streak: number = 1;

    for (let i = logs.length - 1; i > 0; i--) {
      const current = logs[i].date;
      const previous = logs[i - 1].date;

      // Appending forces UTC and avoids timezone issues.
      const currentDate = new Date(`${current}T00:00:00Z`);
      const previousDate = new Date(`${previous}T00:00:00Z`);

      const diffInMs = currentDate.getTime() - previousDate.getTime();
      const oneDay = 24 * 60 * 60 * 1000;

      if (diffInMs === oneDay) {
        streak++;
      } else {
        streaks.push(streak);
        streak = 1;
      }
    }

    streaks.push(streak);

    return streaks;
  }

  calculateStreak(logs: Log[], currentDate: Date) {
    let streak = 0;
    const current = new Date(currentDate);

    while (true) {
      const logFound = logs.some((log) => {
        const logDate = new Date(log.date);

        const logDateStr = logDate.toISOString().substring(0, 10);
        const currentStr = current.toISOString().substring(0, 10);
        const isMatch = logDateStr === currentStr;

        return isMatch;
      });

      if (logFound) {
        streak++;
      } else {
        break;
      }

      // Move to the previous day
      current.setDate(current.getDate() - 1);
    }

    return streak;
  }
}
