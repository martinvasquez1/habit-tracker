import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policy.guard';
import { HabitsService } from '../habits.service';
import { Injectable } from '@nestjs/common';
import { Habit } from '../entities/habit.entity';

@Injectable()
export class CreateHabitPolicy implements IPolicyHandler {
  constructor(private readonly habitsService: HabitsService) {}

  async handle(ability: AppAbility) {
    return ability.can(Action.Create, Habit);
  }
}
