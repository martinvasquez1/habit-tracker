import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Color } from '../entities/habit.entity';

export class CreateHabitDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  //@IsNotEmpty()
  //@IsString()
  //icon: string;

  @IsNotEmpty()
  @IsEnum(Color)
  color: Color;
}
