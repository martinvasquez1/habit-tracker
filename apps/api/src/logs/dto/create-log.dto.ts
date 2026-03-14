import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { LogStatus } from '../entities/log.entity';

/**
* Data Transfer Object for creating a log entry for a habit.
*
* @remarks
* - `status` must be one of the defined LogStatus enum values.
* - `date` must be a string in the user's local date `YYYY-MM-DD` format.
* - `note` is optional and can contain additional information about the log.
*/
export class CreateLogDto {
  /**
  * Status of the log entry.
  *
  * @example LogStatus.COMPLETED
  */
  @IsNotEmpty()
  @IsEnum(LogStatus)
  status: LogStatus;

  /**
  * Date of the log entry in `YYYY-MM-DD` format.
  * Only the date portion is allowed; time will be ignored.
  *
  * @example "2000-01-01"
  */
  @IsDateString({ strict: true })
  @MaxLength(10)
  date: string;

  /**
  * Optional note or comment for the log entry.
  *
  * @example "Completed morning workout"
  */
  @IsOptional()
  @IsString()
  note?: string;
}
