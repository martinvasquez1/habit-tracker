import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  HttpException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

import { User, UserRole } from 'src/users/entities/user.entity';

import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';

import { ApiGenericBadRequestResponse } from 'src/common/decorators/bad-request-response';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  @ApiGenericBadRequestResponse()
  @ApiOperation({ operationId: 'signUp' })
  signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up/admin')
  @ApiOperation({ operationId: 'signUpAdmin' })
  signUpAdmin(
    @Body() signUpDto: SignUpDto,
    @Headers() headers: any,
  ): Promise<SignUpResponseDto> {
    const createAdminPassword = Number(headers['create-admin-password']);
    const expectedAdminPassword = Number(process.env.CREATE_ADMIN_PASSWORD);

    if (createAdminPassword !== expectedAdminPassword)
      throw new HttpException('Invalid admin password', HttpStatus.FORBIDDEN);

    return this.authService.signUp(signUpDto, UserRole.ADMIN);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @ApiOperation({ operationId: 'signIn' })
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto);
  }
}
