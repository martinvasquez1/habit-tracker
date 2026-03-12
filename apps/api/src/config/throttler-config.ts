import { registerAs } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';

export default registerAs(
  'throttlerConfig',
  (): ThrottlerModuleOptions => [
    {
      name: 'short',
      ttl: 1000,
      limit: 10,
    },
    {
      name: 'medium',
      ttl: 10000,
      limit: 30,
    },
    {
      name: 'long',
      ttl: 60000,
      limit: 100,
    },
  ],
);
