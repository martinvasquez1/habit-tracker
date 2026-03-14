import { IsDateString, IsOptional } from 'class-validator';

/**
* Query parameters to filter logs or records by a date range.
*
* @remarks
* Both `startDate` and `endDate` must be **strings representing the user's local date**
* in `YYYY-MM-DD` format.
*/
export class DateRangeQueryDto {
  /**
  * Start date of the range filter.
  * Must be a string in `YYYY-MM-DD` format.
  *
  * @example "2000-01-01"
  */
  @IsDateString()
  @IsOptional()
  startDate: string;

  /**
  * End date of the range filter.
  * Must be a string in `YYYY-MM-DD` format.
  *
  * @example "2000-01-01"
  */
  @IsDateString()
  @IsOptional()
  endDate: string;
}
