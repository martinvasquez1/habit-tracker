import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
} from '@nestjs/common';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { ModuleRef, Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from './check-policies.decorator';

export interface IPolicyHandler {
  handle(ability: AppAbility, params: any): Promise<boolean>;
}

export type PolicyHandler = Type<IPolicyHandler>;

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private moduleRef: ModuleRef,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandler = this.reflector.get<PolicyHandler>(
      CHECK_POLICIES_KEY,
      context.getHandler(),
    );

    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);
    const params = context.switchToHttp().getRequest().params;

    const options = { strict: false };
    const policyHandlerInstance = this.moduleRef.get(policyHandler, options);
    const isAllowed = policyHandlerInstance.handle(ability, params);

    return isAllowed;
  }
}
