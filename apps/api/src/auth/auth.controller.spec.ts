import { Test } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { HttpException } from '@nestjs/common';
import { UserRole } from 'src/users/entities/user.entity';

const adminPassword = '123456789';

const signUpDto = {
  email: 'user@email.com',
  password: '123',
  username: 'bob',
} as SignUpDto;
const signInDto = { email: 'user@email.com', password: '123' } as SignInDto;

describe('AuthController', () => {
  let controller: AuthController;

  const mockService = {
    signUp: jest.fn(),
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    process.env.CREATE_ADMIN_PASSWORD = adminPassword;

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockService }],
    }).compile();

    controller = moduleRef.get(AuthController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should return token and user id', async () => {
      const mockResponse = { accessToken: 'token', userId: 1 };
      mockService.signUp.mockResolvedValue(mockResponse);

      const result = await controller.signUp(signUpDto);

      expect(mockService.signUp).toHaveBeenCalledWith(signUpDto);
      expect(mockService.signUp).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('signUpAdmin', () => {
    it('should return token and user id', async () => {
      const headers = { 'create-admin-password': adminPassword };
      const mockResponse = { accessToken: 'token', userId: 1 };
      mockService.signUp.mockResolvedValue(mockResponse);

      const result = await controller.signUpAdmin(signUpDto, headers);

      expect(mockService.signUp).toHaveBeenCalledWith(
        signUpDto,
        UserRole.ADMIN,
      );
      expect(mockService.signUp).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });

    it('should throw 403 if admin password header is incorrect', async () => {
      const headers = { 'create-admin-password': adminPassword + '777' };
      expect(() => controller.signUpAdmin(signUpDto, headers)).toThrow(
        HttpException,
      );
    });

    it('should throw 403 if admin password header is missing', async () => {
      const headers = {};
      expect(() => controller.signUpAdmin(signUpDto, headers)).toThrow(
        HttpException,
      );
    });
  });

  describe('signIn', () => {
    it('should return token and user id', async () => {
      const mockResponse = { accessToken: 'token', userId: 1 };
      mockService.signIn.mockResolvedValue(mockResponse);

      const result = await controller.signIn(signInDto);

      expect(mockService.signIn).toHaveBeenCalledWith(signInDto);
      expect(mockService.signIn).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });
  });
});
