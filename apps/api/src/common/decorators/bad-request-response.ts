import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiExtraModels } from '@nestjs/swagger';
import { BadRequestResponseDto } from './bad-request-response.dto';

export const ApiGenericBadRequestResponse = () => {
  return applyDecorators(
    ApiExtraModels(BadRequestResponseDto),
    ApiBadRequestResponse({
      type: BadRequestResponseDto,
      description: 'Invalid request data',
    }),
  );
};
