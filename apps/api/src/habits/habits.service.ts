import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { HabitsRepository } from './habits.repository';

import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

import { Habit } from './entities/habit.entity';
import { Log } from 'src/logs/entities/log.entity';

@Injectable()
export class HabitsService {
  constructor(
    private habitsRepository: HabitsRepository,
    private usersService: UsersService,
  ) {}

  async create(userId: number, dto: CreateHabitDto): Promise<Habit> {
    const user = await this.usersService.findOne(userId);

    const { name, description, color } = dto;
    return this.habitsRepository.create(user, name, color, description);
  }

  async findAll(userId: number): Promise<Habit[]> {
    const user = await this.usersService.findOne(userId);
    return this.habitsRepository.findAll(user);
  }

  async findAllWithLogs(
    userId: number,
    startDate: Date,
    endDate: Date,
    currentDate: Date,
  ) {
    await this.usersService.findOne(userId);

    const start = startDate.toISOString().substring(0, 10);
    const end = endDate.toISOString().substring(0, 10);

    const habits = await this.habitsRepository.findAllWithRangedLogs(
      userId,
      start,
      end,
    );
    const habitsWithStreaks = habits.map((habit) => ({
      ...habit,
      streak: this.calculateStreak(habit.logs, currentDate),
    }));

    return habitsWithStreaks;
  }

  async findOne(id: number) {
    const habit = await this.habitsRepository.findOne(id);
    if (!habit) throw new NotFoundException(`Habit with ID ${id} not found`);
    return habit;
  }

  async update(id: number, updateHabitDto: UpdateHabitDto) {
    const habit = await this.habitsRepository.findOne(id);
    if (!habit) throw new NotFoundException(`Habit with ID ${id} not found`);

    return await this.habitsRepository.update(habit, updateHabitDto);
  }

  async remove(id: number) {
    const habit = await this.habitsRepository.findOne(id);
    if (!habit) throw new NotFoundException(`Habit with ID ${id} not found`);

    return this.habitsRepository.remove(id);
  }

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

  async getStreak(habitId: number, currentDate: Date) {
    await this.findOne(habitId);

    const habit = await this.habitsRepository.findOneWithLogs(habitId);
    const streak = this.calculateStreak(habit!.logs, currentDate);

    return streak;
  }

  async getStats(habitId: number, currentDate: Date) {
    const habit = await this.habitsRepository.findAllWithCompletedLogs(
      habitId,
      'ASC',
    );
    const logs = habit.flatMap((habit) => habit.logs);

    const currentStreak = this.calculateStreak(logs, currentDate);
    const streaks = this.calculateStreaks(logs);
    const amountOfLogs = logs.length;

    const results = { currentStreak, streaks, amountOfLogs };

    return results;
  }
}
