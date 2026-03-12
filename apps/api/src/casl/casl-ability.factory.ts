import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';

import { InferSubjects } from '@casl/ability';
import { Habit } from 'src/habits/entities/habit.entity';
import { User } from 'src/users/entities/user.entity';
import { Log } from 'src/logs/entities/log.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects = InferSubjects<typeof Habit | typeof User | typeof Log> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    // eslint-disable-next-line prettier/prettier
    const { can, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
      // eslint-disable-next-line prettier/prettier
    >(Ability as AbilityClass<AppAbility>);

    if (user.role === 'admin') {
      can(Action.Manage, 'all'); // read-write access to everything
    }

    can(Action.Create, User);
    can(Action.Read, User, { id: user.id });
    can(Action.Update, User, { id: user.id });
    can(Action.Delete, User, { id: user.id });

    can(Action.Create, Habit);
    can(Action.Read, Habit, { userId: user.id });
    can(Action.Update, Habit, { userId: user.id });
    can(Action.Delete, Habit, { userId: user.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
