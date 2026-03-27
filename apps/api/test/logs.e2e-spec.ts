import { StartedTestContainer } from 'testcontainers';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { createPostgresContainer } from './util/create-postgres-container';
import { createApp } from './util/create-app';

import { DataSource } from 'typeorm';
import cleanDatabase from './util/clean-database';

import { HabitsModule } from 'src/habits/habits.module';
import { LogsModule } from 'src/logs/logs.module';
import { AuthModule } from 'src/auth/auth.module';

import { Habit } from 'src/habits/entities/habit.entity';
import { Log, LogStatus } from 'src/logs/entities/log.entity';

const userDto = {
  username: 'admin',
  email: 'admin@admin.com',
  password: '123',
};

const habitDto = {
  name: 'Code',
  description: '...',
  color: 'red',
};

const logDto = {
  status: LogStatus.COMPLETED,
  date: '2000-01-19',
  note: 'First log',
};

let token: string;
let userHabit: Habit;
let userLog: Log;

describe('Logs (e2e)', () => {
  let app: INestApplication;
  let startedContainer: StartedTestContainer;
  let dataSource: DataSource;

  async function populateDatabase() {
    const { body } = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send(userDto);
    token = body.accessToken;

    const { body: createBody } = await request(app.getHttpServer())
      .post(`/habits`)
      .set('Authorization', `Bearer ${token}`)
      .send(habitDto);
    userHabit = createBody;

    const { body: createLogDto } = await request(app.getHttpServer())
      .post(`/habits/${userHabit.id}/logs`)
      .set('Authorization', `Bearer ${token}`)
      .send(logDto);
    userLog = createLogDto;
  }

  beforeAll(async () => {
    const { container, dbURL } = await createPostgresContainer();
    startedContainer = container;

    app = await createApp([HabitsModule, LogsModule, AuthModule], dbURL);
    dataSource = app.get(DataSource);

    await app.init();
  }, 100000);

  beforeEach(async () => await populateDatabase());
  afterEach(async () => await cleanDatabase(dataSource));

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
    await startedContainer.stop();
  }, 100000);

  it('should compile the module', async () => {
    expect(module).toBeDefined();
  });

  describe('POST /habits/:id/logs', () => {
    const dto = {
      status: 'completed',
      date: '2000-01-20',
      note: '...',
    };

    it('should create a log with status COMPLETED', async () => {
      const { body } = await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(dto)
        .expect(201);

      expect(body).toEqual({
        ...dto,
        id: expect.any(Number),
        habitId: 1,
        createdDate: expect.any(String),
      });
    });

    it('should create a log with status SKIPPED', async () => {
      const dto = {
        status: LogStatus.SKIPPED,
        date: '2000-01-20',
        note: '...',
      }

      const { body } = await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(dto)
        .expect(201);

      expect(body).toEqual({
        ...dto,
        id: expect.any(Number),
        habitId: 1,
        createdDate: expect.any(String),
      });
    });

    it('should throw ConflictException if a log already exists for date', async () => {
      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(dto)
        .expect(201);

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(dto)
        .expect(409);
    });

    it('should return 400 if date is not in YYYY-MM-DD format', async () => {
      const invalidDtos = [
        { ...dto, date: '2099-99-99' },
        { ...dto, date: '20-01-2000' },
        { ...dto, date: '2000/01/20' },
        { ...dto, date: '01-20-2000' },
        { ...dto, date: '2000-1-20' },
        { ...dto, date: '2000-01-20T00:00:00Z' },
        { ...dto, date: 'invalid-date' },
      ];

      for (const invalidDto of invalidDtos) {
        await request(app.getHttpServer())
          .post(`/habits/${userHabit.id}/logs`)
          .set('Authorization', `Bearer ${token}`)
          .send(invalidDto)
          .expect(400);
      }
    });

    it('should return 400 for invalid calendar dates in YYYY-MM-DD format', async () => {
      const invalidDtos = [
        { ...dto, date: '2000-02-31' },
        { ...dto, date: '2000-04-31' },
        { ...dto, date: '2000-13-01' },
        { ...dto, date: '2000-00-10' },
        { ...dto, date: '2000-01-00' },
      ];

      for (const invalidDto of invalidDtos) {
        await request(app.getHttpServer())
          .post(`/habits/${userHabit.id}/logs`)
          .set('Authorization', `Bearer ${token}`)
          .send(invalidDto)
          .expect(400);
      }
    });
  });

  describe('GET /habits/:id/logs', () => {
    it('should get logs', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual([userLog]);
    });
  });

  describe('GET /habits/:id/logs/:id', () => {
    it('should get log by id', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/habits/${userHabit.id}/logs/${userLog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual(userLog);
    });

    it('should return 404 for non-existent log', async () => {
      await request(app.getHttpServer())
        .get(`/habits/${userHabit.id}/logs/777`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PATCH /habits/:id/logs/:id', () => {
    it('should update log note', async () => {
      const expectedLog = { ...userLog, note: 'new' };

      const { body } = await request(app.getHttpServer())
        .patch(`/habits/${userHabit.id}/logs/${userLog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ note: expectedLog.note })
        .expect(200);

      expect(body).toEqual(expectedLog);
    });

    it('should update log status from COMPLETED to SKIPPED', async () => {
      const expectedLog = { ...userLog, status: LogStatus.SKIPPED };

      const { body } = await request(app.getHttpServer())
        .patch(`/habits/${userHabit.id}/logs/${userLog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ status: expectedLog.status })
        .expect(200);

      expect(body).toEqual(expectedLog);
    });

    it('should return 404 for non-existent log', async () => {
      await request(app.getHttpServer())
        .patch(`/habits/${userHabit.id}/logs/777`)
        .set('Authorization', `Bearer ${token}`)
        .send({ note: 'new' })
        .expect(404);
    });
  });

  describe('DELETE /habits/:id/logs/:id', () => {
    it('should delete a log', async () => {
      await request(app.getHttpServer())
        .delete(`/habits/${userHabit.id}/logs/${userLog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/habits/${userHabit.id}/logs/${userLog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    it('should return deleted log', async () => {
      const { body } = await request(app.getHttpServer())
        .delete(`/habits/${userHabit.id}/logs/${userLog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...userLogWithoutId } = userLog;
      expect(body).toEqual(userLogWithoutId);
    });

    it('should return 404 for non-existent log', async () => {
      await request(app.getHttpServer())
        .delete(`/habits/${userHabit.id}/logs/777`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});
