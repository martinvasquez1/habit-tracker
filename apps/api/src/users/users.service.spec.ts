import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { DeleteResult } from 'typeorm';

import { UsersService } from 'src/users/users.service';
import { UsersRepository } from './users.repository';

import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginateResultDto } from 'src/common/paginate/dto/paginate-result.dto';
import { PaginateOptionsDto } from 'src/common/paginate/dto/paginate-options.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import paginate from 'src/common/paginate/paginate';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

jest.mock('../common/paginate/paginate.ts', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUser: User = {
  id: 1,
  username: 'bob',
  email: 'bob@test.com',
  password: 'hashed-password',
  role: UserRole.BASIC,
} as User;

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: jest.Mocked<UsersRepository>;

  const mockedBcryptHash = bcrypt.hash as jest.MockedFunction<
    (data: string, saltOrRounds: number) => Promise<string>
  >;
  const mockedPaginate = paginate as jest.MockedFunction<typeof paginate>;

  const mockUsersRepository = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByEmail: jest.fn(),
    findByUsername: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(UsersRepository);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      username: 'alice',
      email: 'alice@test.com',
      password: '123456',
    } as any;

    it('should create a new user', async () => {
      usersRepository.findByEmail.mockResolvedValue(null);
      usersRepository.findByUsername.mockResolvedValue(null);
      mockedBcryptHash.mockResolvedValue('hashed-password');
      usersRepository.create.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto, UserRole.BASIC);

      expect(result).toEqual(mockUser);
    });

    it('should throw ConflictException if email already exists', async () => {
      usersRepository.findByEmail.mockResolvedValue(mockUser);
      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if username already exists', async () => {
      usersRepository.findByUsername.mockResolvedValue(mockUser);
      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    const mockPaginatedResult: PaginateResultDto<User> = {
      results: [mockUser],
      totalPages: 1,
    };

    it('should return paginated users', async () => {
      usersRepository.findAll.mockResolvedValue([[mockUser], 1]);
      mockedPaginate.mockResolvedValue(mockPaginatedResult);

      const options: PaginateOptionsDto<User> = {};
      const result = await service.findAll(options);

      expect(result).toEqual(mockPaginatedResult);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      usersRepository.findOne.mockResolvedValue(mockUser);
      const result = await service.findOne(1);
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      usersRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(
        new NotFoundException('User with ID 99 not found'),
      );
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      usersRepository.findByEmail.mockResolvedValue(mockUser);
      const result = await service.findByEmail(mockUser.email);
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      usersRepository.findByEmail.mockResolvedValue(null);
      await expect(service.findByEmail('99@99.com')).rejects.toThrow(
        new NotFoundException('User not found'),
      );
    });
  });

  describe('update', () => {
    const updateDto: UpdateUserDto = {
      username: 'bob2',
      password: 'newpass',
    } as any;

    it('should update user including hashing password', async () => {
      usersRepository.findOne.mockResolvedValue(mockUser);
      mockedBcryptHash.mockResolvedValue('hashed-password');
      const updatedUser = {
        ...mockUser,
        username: updateDto.username!,
        password: 'hashed-password',
      };
      usersRepository.update.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(updatedUser);
    });

    it('should update user without password if not provided', async () => {
      usersRepository.findOne.mockResolvedValue(mockUser);
      const updatedUser = { ...mockUser, username: updateDto.username! };
      usersRepository.update.mockResolvedValue(updatedUser);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      usersRepository.findOne.mockResolvedValue(null);
      await expect(service.update(99, updateDto)).rejects.toThrow(
        new NotFoundException('User with ID 99 not found'),
      );
    });
  });

  describe('remove', () => {
    it('should remove user and return it', async () => {
      usersRepository.findOne.mockResolvedValue(mockUser);
      usersRepository.remove.mockResolvedValue({} as DeleteResult);

      const result = await service.remove(1);

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user not found', async () => {
      usersRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(99)).rejects.toThrow(
        new NotFoundException('User with ID 99 not found'),
      );
    });
  });
});
