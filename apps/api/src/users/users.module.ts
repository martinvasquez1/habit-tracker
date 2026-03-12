import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CaslModule } from 'src/casl/casl.module';
import { User } from './entities/user.entity';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

import { CreateUserPolicy } from './policies/create-user-policy';
import { ReadAllUsersPolicy } from './policies/read-all-users-policy';
import { ReadUserPolicy } from './policies/read-user-policy';
import { UpdateUserPolicy } from './policies/update-user-policy';
import { DeleteUserPolicy } from './policies/delete-user-policy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CaslModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    CreateUserPolicy,
    ReadAllUsersPolicy,
    ReadUserPolicy,
    UpdateUserPolicy,
    DeleteUserPolicy,
  ],
  exports: [UsersService],
})
export class UsersModule {}
