import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { HabitsController } from './habits.controller';
import { HabitsService } from './habits.service';

import { Habit } from './entities/habit.entity';
import { Log } from 'src/logs/entities/log.entity';

import { CreateHabitDto } from './dto/create-habit.dto';
import { GetStreakQueryDto } from './dto/get-streak-query.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

import { PolicyGuard } from 'src/casl/policy.guard';

const mockHabit = {
  name: 'Meditate',
  color: 'blue',
  id: 1,
} as Habit;

describe('HabitsController', () => {
  let controller: HabitsController;
  let service: jest.Mocked<HabitsService>;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllWithLogs: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getStreak: jest.fn(),
    getStats: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HabitsController],
      providers: [{ provide: HabitsService, useValue: mockService }],
    })
      .overrideGuard(PolicyGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = moduleRef.get(HabitsController);
    service = moduleRef.get(HabitsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an habit', async () => {
      const userId = 1;
      const dto = { name: 'Workout' } as CreateHabitDto;
      const expected = { id: 2, ...dto };

      mockService.create.mockResolvedValue(expected);

      const result = await controller.create(userId, dto);

      expect(mockService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const mockResponse = [mockHabit];
      mockService.findAll.mockResolvedValue(mockResponse);

      const result = await controller.findAll(1);

      expect(mockService.findAll).toHaveBeenCalledWith(1);
      expect(mockService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findAllWithLogs', () => {
    it('should get habits with logs', async () => {
      const mockLog = { id: 1 } as Log;
      const mockResponse = [{ ...mockHabit, logs: [mockLog], streak: 1 }];

      const userId = 1;
      const query = {
        startDate: '2001-01-01',
        endDate: '2001-01-31',
        currentDate: '2001-01-15',
      };

      service.findAllWithLogs.mockResolvedValue(mockResponse);

      const result = await controller.findAllWithLogs(userId, query);

      expect(mockService.findAllWithLogs).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getStats', () => {
    it('should get habit stats', async () => {
      const id = 1;
      const query = { currentDate: '2001-01-01' } as GetStreakQueryDto;
      const mockResult = { currentStreak: 0, streaks: [], amountOfLogs: 0 };

      service.getStats.mockResolvedValue(mockResult);

      const result = await controller.getStats(id, query);

      expect(mockService.getStats).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should return habit by id', async () => {
      mockService.findOne.mockResolvedValue(mockHabit);

      const result = await controller.findOne('1');

      expect(mockService.findOne).toHaveBeenCalledWith(1);
      expect(mockService.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockHabit);
    });

    it('should propagate errors', async () => {
      mockService.findOne.mockRejectedValue(
        new NotFoundException('Habit not found'),
      );
      await expect(controller.findOne('99')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const dto = { name: 'new-name' } as UpdateHabitDto;

    it('should update habit', async () => {
      const mockResponse = { ...mockHabit, name: dto.name! };
      service.update.mockResolvedValue(mockResponse);

      const result = await controller.update('1', dto);

      expect(mockService.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });

    it('should propagate errors', async () => {
      mockService.update.mockRejectedValue(
        new NotFoundException('Habit not found'),
      );
      await expect(controller.update('99', dto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove habit by id', async () => {
      service.remove.mockResolvedValue(mockHabit);

      const result = await controller.remove('1');

      expect(mockService.remove).toHaveBeenCalledWith(1);
      expect(mockService.remove).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockHabit);
    });

    it('should propagate errors', async () => {
      mockService.remove.mockRejectedValue(
        new NotFoundException('Habit not found'),
      );
      await expect(controller.remove('99')).rejects.toThrow(NotFoundException);
    });
  });
});
