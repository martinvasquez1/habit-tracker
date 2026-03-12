import { IsDateString, IsNotEmpty } from 'class-validator';

export class DateRangeLogsQueryDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsDateString()
  currentDate: string;
}
