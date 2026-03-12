import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/users/entities/user.entity';
import { Habit } from 'src/habits/entities/habit.entity';
import { Log } from 'src/logs/entities/log.entity';
import { ConfigModule } from '@nestjs/config';

export async function createApp(
  modules: any[],
  dbURL: string,
): Promise<INestApplication<any>> {
  const moduleRef = await Test.createTestingModule({
    imports: [
      ...modules,
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: dbURL,
        entities: [User, Habit, Log],
        synchronize: true,
      }),
    ],
  }).compile();

  const app = moduleRef.createNestApplication();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  return app;
}
