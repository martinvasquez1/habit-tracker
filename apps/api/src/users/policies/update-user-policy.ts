import { Action, AppAbility } from 'src/casl/casl-ability.factory';
import { IPolicyHandler } from 'src/casl/policy.guard';
import { UsersService } from '../users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserPolicy implements IPolicyHandler {
  constructor(private readonly usersService: UsersService) {}

  async handle(ability: AppAbility, params: any) {
    const user = await this.usersService.findOne(+params.id);
    return ability.can(Action.Update, user);
  }
}
