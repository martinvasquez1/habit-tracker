import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CaslModule } from 'src/casl/casl.module';
import { HabitsModule } from 'src/habits/habits.module';

import { LogsService } from './logs.service';
import { LogsRepository } from './logs.repository';
import { Log } from './entities/log.entity';

import { CreateLogPolicy } from './policies/create-log-policy';
import { ReadLogPolicy } from './policies/read-log-policy';
import { UpdateLogPolicy } from './policies/update-log-policy';
import { DeleteLogPolicy } from './policies/delete-log-policy';

@Module({
  imports: [TypeOrmModule.forFeature([Log]), HabitsModule, CaslModule],
  controllers: [LogsController],
  providers: [
    LogsService,
    LogsRepository,
    CreateLogPolicy,
    ReadLogPolicy,
    UpdateLogPolicy,
    DeleteLogPolicy,
  ],
  exports: [LogsService],
})
export class LogsModule {}
