import { GenericContainer, StartedTestContainer } from 'testcontainers';

interface PostgresContainerResult {
  container: StartedTestContainer;
  dbURL: string;
}

export async function createPostgresContainer(): Promise<PostgresContainerResult> {
  const container = await new GenericContainer('postgres')
    .withEnvironment({
      POSTGRES_USER: 'test',
      POSTGRES_PASSWORD: 'test',
      POSTGRES_DB: 'test',
    })
    .withExposedPorts(5432)
    .start();

  const waitDbDelay = 5000;
  await new Promise((resolve) => setTimeout(resolve, waitDbDelay));

  const dbPort = container.getMappedPort(5432);
  const dbURL = `postgres://test:test@localhost:${dbPort}/test`;

  return { container, dbURL };
}
