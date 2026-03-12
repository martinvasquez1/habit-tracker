import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PolicyGuard } from './policy.guard';

@Module({
  providers: [CaslAbilityFactory, PolicyGuard],
  exports: [CaslAbilityFactory, PolicyGuard],
})
export class CaslModule {}
