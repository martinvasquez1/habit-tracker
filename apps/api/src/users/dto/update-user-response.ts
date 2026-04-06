import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserResponse extends PartialType(CreateUserDto) {
  @IsString()
  bio: string;

  @IsString()
  profilePicture: string;

  @IsString()
  coverPhoto: string;
}