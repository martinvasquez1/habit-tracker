import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from './policy.guard';

export const CHECK_POLICIES_KEY = 'check_policy';

export const CheckPolicies = (handler: PolicyHandler) =>
  SetMetadata(CHECK_POLICIES_KEY, handler);
