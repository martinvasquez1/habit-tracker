import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entities/habit.entity';

import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { UsersModule } from 'src/users/users.module';
import { StatsModule } from 'src/stats/stats.module';
import { CaslModule } from 'src/casl/casl.module';

import { CreateHabitPolicy } from './policies/create-habit-policy';
import { ReadHabitPolicy } from './policies/read-habit-policy';
import { UpdateHabitPolicy } from './policies/update-habit-policy';
import { DeleteHabitPolicy } from './policies/delete-habit-policy';
import { HabitsRepository } from './habits.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Habit]), UsersModule, StatsModule, CaslModule],
  controllers: [HabitsController],
  providers: [
    HabitsService,
    HabitsRepository,
    CreateHabitPolicy,
    ReadHabitPolicy,
    UpdateHabitPolicy,
    DeleteHabitPolicy,
  ],
  exports: [HabitsService],
})
export class HabitsModule {}
