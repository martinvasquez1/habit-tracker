import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';
import { HabitsRepository } from './habits.repository';

import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { StatsService } from 'src/stats/stats.service';

import { Habit } from './entities/habit.entity';
import { Log } from 'src/logs/entities/log.entity';

@Injectable()
export class HabitsService {
  constructor(
    private habitsRepository: HabitsRepository,
    private usersService: UsersService,
    private statsService: StatsService,
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
      streak: this.statsService.calculateStreak(habit.logs, currentDate),
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

  async getStats(habitId: number, currentDate: Date) {
    const habit = await this.habitsRepository.findOneWithLogs(
      habitId,
      'ASC',
    );
    if (!habit) throw new NotFoundException(`Habit with ID ${habitId} not found`);

    const logs = habit.logs

    const currentStreak = this.statsService.calculateStreak(logs, currentDate);
    const streaks = this.statsService.calculateStreaks(logs);
    const amountOfLogs = logs.length;

    const results = { currentStreak, streaks, amountOfLogs };

    return results;
  }
}
