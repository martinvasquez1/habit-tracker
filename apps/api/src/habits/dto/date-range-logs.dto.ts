import { IsDateString, IsNotEmpty } from 'class-validator';

/**
* Query parameters used to retrieve habits together with their logs
* within a specific date range.
*
* @remarks
* All date values must be provided as **strings representing the user's local date**
* in `YYYY-MM-DD` format (ISO local date without time).
*/
export class DateRangeLogsQueryDto {
  /**
  * Start date of the requested range.
  * Must be a string representing the user's local date in `YYYY-MM-DD` format.
  */
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  /**
  * End date of the requested range.
  * Must be a string representing the user's local date in `YYYY-MM-DD` format.
  */
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  /**
  * Current date in the user's local timezone.
  * Must be a string representing the user's local date in `YYYY-MM-DD` format.
  */
  @IsNotEmpty()
  @IsDateString()
  currentDate: string;
}
