import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policy.guard';
import { HabitsService } from '../../habits/habits.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateLogPolicy implements IPolicyHandler {
  constructor(private readonly habitsService: HabitsService) {}

  async handle(ability: AppAbility, params: any) {
    const habit = await this.habitsService.findOne(+params.habitId);
    return ability.can(Action.Update, habit);
  }
}
