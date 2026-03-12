import { PartialType, PickType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateHabitDto } from './create-habit.dto';

export class UpdateHabitDto extends PartialType(PickType(CreateHabitDto, ['name', 'description', 'color'] as const)) {
  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}
