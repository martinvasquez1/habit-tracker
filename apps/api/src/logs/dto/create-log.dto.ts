import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { LogStatus } from '../entities/log.entity';

export class CreateLogDto {
  @IsNotEmpty()
  @IsEnum(LogStatus)
  status: LogStatus;

  @IsDateString({ strict: true })
  @MaxLength(10)
  date: string; // YYYY-MM-DD

  @IsOptional()
  @IsString()
  note?: string;
}
