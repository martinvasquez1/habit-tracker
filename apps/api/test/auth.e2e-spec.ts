import { StartedTestContainer } from 'testcontainers';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { createPostgresContainer } from './util/create-postgres-container';
import { createApp } from './util/create-app';

import { AuthModule } from 'src/auth/auth.module';
import { DataSource } from 'typeorm';
import cleanDatabase from './util/clean-database';

const user1Dto = {
  username: 'user1',
  email: 'user1@example.com',
  password: '1',
};

describe('/auth', () => {
  let app: INestApplication;
  let startedContainer: StartedTestContainer;
  let dataSource: DataSource;

  beforeAll(async () => {
    const { container, dbURL } = await createPostgresContainer();
    startedContainer = container;

    app = await createApp([AuthModule], dbURL);
    dataSource = app.get(DataSource);

    await app.init();
  }, 100000);

  afterEach(async () => await cleanDatabase(dataSource));

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
    await startedContainer.stop();
  }, 100000);

  it('should compile the module', async () => {
    expect(module).toBeDefined();
  });

  describe('POST /auth/sign-up', () => {
    it(`should return access token and user id`, async () => {
      const { body } = await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(user1Dto)
        .expect(201);

      expect(body).toEqual({
        accessToken: expect.any(String),
        userId: 1,
      });
    });

    it('should return 409 for duplicate email', async () => {
      await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(user1Dto)
        .expect(201);
      await request(app.getHttpServer())
        .post('/auth/sign-up')
        .send(user1Dto)
        .expect(409);
    });
  });

  describe('POST /auth/sign-in', () => {
    it(`should return access token and user id for existing user`, async () => {
      await request(app.getHttpServer()).post('/auth/sign-up').send(user1Dto);
      const { body } = await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send(user1Dto)
        .expect(200);

      expect(body).toEqual({
        accessToken: expect.any(String),
        userId: 1,
      });
    });

    it(`should return 404 for non-existent user`, async () => {
      await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send(user1Dto)
        .expect(404);
    });

    it(`should return 401 for invalid password`, async () => {
      await request(app.getHttpServer()).post('/auth/sign-up').send(user1Dto);
      await request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ ...user1Dto, password: 'wrong_password' })
        .expect(401);
    });
  });
});
