import { DataSource } from 'typeorm';

export default async function cleanDatabase(
  dataSource: DataSource,
): Promise<void> {
  const entities = dataSource.entityMetadatas;

  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.query(
      `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`,
    );
  }
}
