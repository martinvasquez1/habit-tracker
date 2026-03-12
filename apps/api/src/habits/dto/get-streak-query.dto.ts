import { IsDateString } from 'class-validator';

export class GetStreakQueryDto {
  @IsDateString()
  currentDate: string;
}
