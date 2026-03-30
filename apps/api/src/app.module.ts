import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import typeOrmConfig from './config/type-orm.config';
import throttlerConfig from './config/throttler-config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HabitsModule } from './habits/habits.module';
import { LogsModule } from './logs/logs.module';
import { CaslModule } from './casl/casl.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig()),
    ThrottlerModule.forRoot(throttlerConfig()),
    UsersModule,
    AuthModule,
    HabitsModule,
    LogsModule,
    CaslModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
