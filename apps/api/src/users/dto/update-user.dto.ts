import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Profile picture file' })
  profilePicture?: any;

  @ApiPropertyOptional({ type: 'string', format: 'binary', description: 'Cover photo file' })
  coverPhoto?: any;
}

export class UpdateUserDtoWithPaths extends UpdateUserDto {
  profilePicturePath?: string;
  coverPhotoPath?: string;
}