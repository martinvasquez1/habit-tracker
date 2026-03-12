import { IsDateString } from 'class-validator';

export class GetStatsQueryDto {
  @IsDateString()
  currentDate: string;
}
