import { IsDateString } from 'class-validator';

/**
* Query parameters used to retrieve streak information for a habit.
*
* @remarks
* The `currentDate` must be a **string representing the user's local date**
* in `YYYY-MM-DD` format.
*/
export class GetStreakQueryDto {
  /**
  * The current date for which the streak should be calculated.
  * Must be a string in `YYYY-MM-DD` format.
  */
  @IsDateString()
  currentDate: string;
}
