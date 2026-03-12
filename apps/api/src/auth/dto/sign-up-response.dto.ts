import { IsString } from 'class-validator';

export class SignUpResponseDto {
  @IsString()
  accessToken: string;
}
