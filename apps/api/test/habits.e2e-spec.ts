import { StartedTestContainer } from 'testcontainers';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { createPostgresContainer } from './util/create-postgres-container';
import { createApp } from './util/create-app';

import { DataSource } from 'typeorm';
import cleanDatabase from './util/clean-database';

import { HabitsModule } from 'src/habits/habits.module';
import { StatsModule } from 'src/stats/stats.module';
import { LogsModule } from 'src/logs/logs.module';
import { AuthModule } from 'src/auth/auth.module';

import { Habit } from 'src/habits/entities/habit.entity';
import { LogStatus } from 'src/logs/entities/log.entity';

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

let token: string;
let userHabit: Habit;

describe('/habits', () => {
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
  }

  beforeAll(async () => {
    const { container, dbURL } = await createPostgresContainer();
    startedContainer = container;

    app = await createApp([HabitsModule, StatsModule, LogsModule, AuthModule], dbURL);
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

  describe('POST /habits', () => {
    it('should create habit', async () => {
      const dto = { name: 'Meditate', description: '...', color: 'blue' };

      const { body } = await request(app.getHttpServer())
        .post(`/habits`)
        .set('Authorization', `Bearer ${token}`)
        .send(dto)
        .expect(201);

      expect(body).toEqual({
        ...dto,
        id: expect.any(Number),
        icon: null,
        isArchived: false,
        userId: 1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('should create habit without description', async () => {
      const dto = { name: 'Meditate', color: 'blue' };

      const { body } = await request(app.getHttpServer())
        .post(`/habits`)
        .set('Authorization', `Bearer ${token}`)
        .send(dto)
        .expect(201);

      expect(body).toEqual({
        ...dto,
        id: expect.any(Number),
        description: null,
        icon: null,
        isArchived: false,
        userId: 1,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('should return 400 if name is missing', async () => {
      const dto = { color: 'blue' };

      await request(app.getHttpServer())
        .post(`/habits`)
        .set('Authorization', `Bearer ${token}`)
        .send(dto)
        .expect(400);
    });

    it('should return 400 if color is missing', async () => {
      const dto = { name: 'Meditate' };

      await request(app.getHttpServer())
        .post(`/habits`)
        .set('Authorization', `Bearer ${token}`)
        .send(dto)
        .expect(400);
    });
  });

  describe('GET /habits', () => {
    it('should get habits', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/habits`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual([userHabit]);
    });
  });

  describe('GET /habits/logs', () => {
    it('should get habits, logs and streak', async () => {
      const logDto = {
        status: 'completed',
        date: '2000-01-15',
        note: '...',
      };

      const { body: createLogRes } = await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDto)
        .expect(201);

      const startDate = '2000-01-10';
      const now = '2000-01-20';

      const res = await request(app.getHttpServer())
        .get(`/habits/logs`)
        .set('Authorization', `Bearer ${token}`)
        .query({ startDate, endDate: now, currentDate: now })
        .expect(200);

      const habitsWithLog = [{ ...userHabit, logs: [createLogRes], streak: 0 }];
      expect(res.body).toEqual(habitsWithLog);
    });

    it('should get unarchived habits', async () => {
      const startDate = '2000-01-10';
      const now = '2000-01-20';

      const updateDto = { isArchived: true };

      const activeHabitDto = {
        name: 'Brushing teeth',
        description: '...',
        color: 'red',
      };

      const { body: activeHabit } = await request(app.getHttpServer())
        .post(`/habits`)
        .set('Authorization', `Bearer ${token}`)
        .send(activeHabitDto)
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/habits/${userHabit.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateDto)
        .expect(200);

      const res = await request(app.getHttpServer())
        .get(`/habits/logs`)
        .set('Authorization', `Bearer ${token}`)
        .query({ startDate, endDate: now, currentDate: now })
        .expect(200);

      const habitsWithLog = [{ ...activeHabit, logs: [], streak: 0 }];
      expect(res.body).toEqual(habitsWithLog);
    });
  });

  describe('GET /habits/:id/stats | C = Completed | S = Skipped | M = Missed', () => {
    it('should get stats for habit with no logs', async () => {
      const currentDate = '2000-01-10';

      const { body } = await request(app.getHttpServer())
        .get(`/habits/${userHabit.id}/stats`)
        .set('Authorization', `Bearer ${token}`)
        .query({ currentDate })
        .expect(200);

      const stats = { currentStreak: 0, streaks: [], amountOfLogs: 0 };
      expect(body).toEqual(stats);
    });

    it('should get stats for habit with logs: C', async () => {
      const currentDate = '2000-01-10';

      const logDto = {
        status: 'completed',
        date: '2000-01-10',
        note: '...',
      };

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDto)
        .expect(201);

      const { body } = await request(app.getHttpServer())
        .get(`/habits/${userHabit.id}/stats`)
        .set('Authorization', `Bearer ${token}`)
        .query({ currentDate })
        .expect(200);

      const stats = { currentStreak: 1, streaks: [1], amountOfLogs: 1 };
      expect(body).toEqual(stats);
    });

    it('should get stats for habit with logs: C C', async () => {
      const currentDate = '2000-06-02';

      const logDtoDay1 = {
        status: 'completed',
        date: '2000-06-01',
        note: 'Day 1',
      };

      const logDtoDay2 = {
        status: 'completed',
        date: '2000-06-02',
        note: 'Day 2',
      };

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDtoDay1)
        .expect(201);

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDtoDay2)
        .expect(201);

      const { body } = await request(app.getHttpServer())
        .get(`/habits/${userHabit.id}/stats`)
        .set('Authorization', `Bearer ${token}`)
        .query({ currentDate })
        .expect(200);

      const stats = { currentStreak: 2, streaks: [2], amountOfLogs: 2 };
      expect(body).toEqual(stats);
    });

    it('should get stats for habit with logs: C M C', async () => {
      const currentDate = '2000-06-03';

      const logDtoDay1 = {
        status: 'completed',
        date: '2000-06-01',
        note: 'Day 1',
      };

      const logDtoDay2 = {
        status: 'completed',
        date: '2000-06-03',
        note: 'Day 2',
      };

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDtoDay1)
        .expect(201);

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDtoDay2)
        .expect(201);

      const { body } = await request(app.getHttpServer())
        .get(`/habits/${userHabit.id}/stats`)
        .set('Authorization', `Bearer ${token}`)
        .query({ currentDate })
        .expect(200);

      const stats = { currentStreak: 1, streaks: [1, 1], amountOfLogs: 2 };
      expect(body).toEqual(stats);
    });

    it('should get stats for habit with logs: S', async () => {
      const currentDate = '2000-06-01';

      const logDtoDay1 = {
        status: LogStatus.SKIPPED,
        date: '2000-06-01',
        note: 'Day 1',
      };

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDtoDay1)
        .expect(201);

      const { body } = await request(app.getHttpServer())
        .get(`/habits/${userHabit.id}/stats`)
        .set('Authorization', `Bearer ${token}`)
        .query({ currentDate })
        .expect(200);

      const stats = { currentStreak: 1, streaks: [1], amountOfLogs: 1 };
      expect(body).toEqual(stats);
    });

    it('should get stats for habit with logs: S S', async () => {
      const currentDate = '2000-06-02';

      const logDtoDay1 = {
        status: LogStatus.SKIPPED,
        date: '2000-06-01',
        note: 'Day 1',
      };

      const logDtoDay2 = {
        status: LogStatus.SKIPPED,
        date: '2000-06-02',
        note: 'Day 2',
      };

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDtoDay1)
        .expect(201);

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDtoDay2)
        .expect(201);

      const { body } = await request(app.getHttpServer())
        .get(`/habits/${userHabit.id}/stats`)
        .set('Authorization', `Bearer ${token}`)
        .query({ currentDate })
        .expect(200);

      const stats = { currentStreak: 2, streaks: [2], amountOfLogs: 2 };
      expect(body).toEqual(stats);
    });

    it('should get stats for habit with logs: S C', async () => {
      const currentDate = '2000-06-02';

      const logDtoDay1 = {
        status: LogStatus.SKIPPED,
        date: '2000-06-01',
        note: 'Day 1',
      };

      const logDtoDay2 = {
        status: LogStatus.COMPLETED,
        date: '2000-06-02',
        note: 'Day 2',
      };

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDtoDay1)
        .expect(201);

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDtoDay2)
        .expect(201);

      const { body } = await request(app.getHttpServer())
        .get(`/habits/${userHabit.id}/stats`)
        .set('Authorization', `Bearer ${token}`)
        .query({ currentDate })
        .expect(200);

      const stats = { currentStreak: 2, streaks: [2], amountOfLogs: 2 };
      expect(body).toEqual(stats);
    });

    it('should get stats for habit with logs: C S C', async () => {
      const currentDate = '2000-06-03';

      const logDtoDay1 = {
        status: LogStatus.COMPLETED,
        date: '2000-06-01',
        note: 'Day 1',
      };

      const logDtoDay2 = {
        status: LogStatus.SKIPPED,
        date: '2000-06-02',
        note: 'Day 2',
      };

      const logDtoDay3 = {
        status: LogStatus.COMPLETED,
        date: '2000-06-03',
        note: 'Day 3',
      };

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDtoDay1)
        .expect(201);

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDtoDay2)
        .expect(201);

      await request(app.getHttpServer())
        .post(`/habits/${userHabit.id}/logs`)
        .set('Authorization', `Bearer ${token}`)
        .send(logDtoDay3)
        .expect(201);

      const { body } = await request(app.getHttpServer())
        .get(`/habits/${userHabit.id}/stats`)
        .set('Authorization', `Bearer ${token}`)
        .query({ currentDate })
        .expect(200);

      const stats = { currentStreak: 3, streaks: [3], amountOfLogs: 3 };
      expect(body).toEqual(stats);
    });
  });

  describe('GET /habits/:id', () => {
    it('should get habit by id', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/habits/${userHabit.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(body).toEqual(userHabit);
    });

    it('should return 404 for non-existent habit', async () => {
      await request(app.getHttpServer())
        .get(`/habits/777`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('PATCH /habits/:id', () => {
    it('should update habit', async () => {
      const expectedHabit = {
        ...userHabit,
        name: 'newName',
        updatedAt: expect.any(String),
      };

      const { body } = await request(app.getHttpServer())
        .patch(`/habits/${userHabit.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: expectedHabit.name })
        .expect(200);

      expect(body).toEqual(expectedHabit);
    });

    it('should return 404 for non-existent habit', async () => {
      await request(app.getHttpServer())
        .get(`/habits/777`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });

  describe('DELETE /habits/:id', () => {
    it('should delete a habit', async () => {
      await request(app.getHttpServer())
        .delete(`/habits/${userHabit.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/habits/${userHabit.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });

    it('should return deleted habit', async () => {
      const { body } = await request(app.getHttpServer())
        .delete(`/habits/${userHabit.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...userHabitWithoutId } = userHabit;
      expect(body).toEqual(userHabitWithoutId);
    });

    it('should return 404 for non-existent habit', async () => {
      await request(app.getHttpServer())
        .delete(`/habits/777`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
    });
  });
});
