import { PartialType, PickType } from '@nestjs/swagger';
import { CreateLogDto } from './create-log.dto';

export class UpdateLogDto extends PartialType(PickType(CreateLogDto, ['note', 'status'] as const)) {}
