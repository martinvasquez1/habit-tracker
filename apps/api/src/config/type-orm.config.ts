import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'typeOrmConfig',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: process.env.DB_URL,
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV !== 'production',
  }),
);
