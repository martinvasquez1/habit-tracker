import { OmitType } from '@nestjs/swagger';
import { Habit } from '../entities/habit.entity';

export class HabitWithStreak extends OmitType(Habit, []) {
    streak: number;
} 

export type FindAllHabitsWithLogsResponseDto = HabitWithStreak[]