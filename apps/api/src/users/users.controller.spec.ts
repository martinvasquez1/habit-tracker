import { Test } from '@nestjs/testing';
import {
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { User, UserRole } from './entities/user.entity';
import { PaginateOptionsDto } from 'src/common/paginate/dto/paginate-options.dto';

import { PolicyGuard } from 'src/casl/policy.guard';
import { UpdateUserDto } from './dto/update-user.dto';

class MockPolicyGuard implements CanActivate {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(_context: ExecutionContext) {
    return true;
  }
}

const mockUser = {
  id: 1,
  username: 'bob',
  email: 'bob@bob.com',
  role: UserRole.BASIC,
} as User;

describe('UsersController', () => {
  let controller: UsersController;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    })
      .overrideGuard(PolicyGuard)
      .useClass(MockPolicyGuard)
      .compile();

    controller = moduleRef.get(UsersController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return user by id', async () => {
      mockService.findOne.mockResolvedValue(mockUser);

      const result = await controller.findOne('1');

      expect(mockService.findOne).toHaveBeenCalledWith(1);
      expect(mockService.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });

    it('should propagate errors', async () => {
      mockService.findOne.mockRejectedValue(
        new NotFoundException('User not found'),
      );
      await expect(controller.findOne('99')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateDto: UpdateUserDto = { username: 'newname' } as any;

    it('should update user by id', async () => {
      mockService.update.mockResolvedValue({ ...mockUser, ...updateDto });

      const result = await controller.update(1, updateDto);

      expect(mockService.update).toHaveBeenCalledWith(1, updateDto);
      expect(mockService.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ ...mockUser, ...updateDto });
    });

    it('should propagate errors', async () => {
      mockService.update.mockRejectedValue(
        new NotFoundException('User not found'),
      );
      await expect(controller.update(99, updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove user by id', async () => {
      mockService.remove.mockResolvedValue(mockUser);

      const result = await controller.remove(1);

      expect(mockService.remove).toHaveBeenCalledWith(1);
      expect(mockService.remove).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });

    it('should propagate errors', async () => {
      mockService.remove.mockRejectedValue(
        new NotFoundException('User not found'),
      );
      await expect(controller.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});
