import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policy.guard';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserPolicy implements IPolicyHandler {
  async handle(ability: AppAbility) {
    return ability.can(Action.Create, User);
  }
}
