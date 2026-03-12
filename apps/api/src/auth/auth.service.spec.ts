import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

import { User, UserRole } from 'src/users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

const mockUser = {
  id: 1,
  email: 'user@email.com',
  username: 'bob',
  password: 'hashed-password',
  role: UserRole.BASIC,
} as User;

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: jest.Mocked<JwtService>;

  const mockUsersService = {
    create: jest.fn(),
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get(JwtService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateToken', () => {
    it('should generate JWT', async () => {
      mockJwtService.signAsync.mockResolvedValue('mocked-token');

      const result = await service.generateToken(mockUser);

      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: mockUser.id,
        username: mockUser.username,
        id: mockUser.id,
        role: mockUser.role,
      });
      expect(result).toBe('mocked-token');
    });
  });

  describe('signUp', () => {
    const signUpDto = {
      email: 'user@email.com',
      password: '123',
      username: 'bob',
    };

    it('should create user and return token and userId', async () => {
      mockUsersService.create.mockResolvedValue(mockUser);
      jest.spyOn(service, 'generateToken').mockResolvedValue('mocked-token');

      const result = await service.signUp(signUpDto);

      expect(result).toEqual({
        accessToken: 'mocked-token',
        userId: mockUser.id,
      });
    });
  });

  describe('signIn', () => {
    const signInDto = {
      email: 'user@email.com',
      password: '123',
    };

    it('should return token and userId for valid credentials', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(service, 'generateToken').mockResolvedValue('mocked-token');

      const result = await service.signIn(signInDto);

      expect(result).toEqual({
        accessToken: 'mocked-token',
        userId: mockUser.id,
      });
    });

    it('should throw 401 if password is wrong', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
