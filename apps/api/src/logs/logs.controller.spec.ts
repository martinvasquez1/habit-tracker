import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { PolicyGuard } from 'src/casl/policy.guard';

import { CreateLogDto } from './dto/create-log.dto';
import { DateRangeQueryDto } from './dto/date-range-query.dto';
import { UpdateLogDto } from './dto/update-log.dto';

import { Habit } from 'src/habits/entities/habit.entity';
import { Log } from './entities/log.entity';

const mockHabit = {
  name: 'Meditate',
  color: 'blue',
  id: 1,
} as Habit;

const mockLog = {
  id: 1,
  note: 'initial',
} as Log;

describe('LogsController', () => {
  let controller: LogsController;
  let service: jest.Mocked<LogsService>;

  const mockService = {
    create: jest.fn(),
    findAllRanged: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LogsController],
      providers: [{ provide: LogsService, useValue: mockService }],
    })
      .overrideGuard(PolicyGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = moduleRef.get(LogsController);
    service = moduleRef.get(LogsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a log ', async () => {
      const dto = {} as CreateLogDto;
      const expected = { ...mockHabit, ...dto };

      mockService.create.mockResolvedValue(expected);
      const result = await controller.create(mockHabit.id, dto);

      expect(mockService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should call findAll when no date range is provided', async () => {
      const query = {} as DateRangeQueryDto;
      const expected: any[] = [];

      mockService.findAll.mockResolvedValue(expected);
      const result = await controller.findAll(mockHabit.id, query);

      expect(mockService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expected);
    });

    it('should call findAllRanged when date range is provided', async () => {
      const startDate = '2000-01-01';
      const endDate = '2000-01-02';
      const query: DateRangeQueryDto = { startDate, endDate };

      const expected: any[] = [];

      mockService.findAllRanged.mockResolvedValue(expected);
      const result = await controller.findAll(mockHabit.id, query);

      expect(mockService.findAllRanged).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should find one', async () => {
      mockService.findOne.mockResolvedValue(mockLog);

      const result = await controller.findOne(mockHabit.id, mockLog.id);

      expect(mockService.findOne).toHaveBeenCalledWith(1, 1);
      expect(mockService.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockLog);
    });

    it('should propagate errors', async () => {
      mockService.findOne.mockRejectedValue(new NotFoundException());
      await expect(
        controller.findOne(mockHabit.id, mockLog.id),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const dto = { note: 'new-name' } as UpdateLogDto;

    it('should update log', async () => {
      const mockResponse = { ...mockLog, name: dto.note };
      service.update.mockResolvedValue(mockResponse);

      const result = await controller.update(mockHabit.id, mockLog.id, dto);

      expect(mockService.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });

    it('should propagate errors', async () => {
      mockService.update.mockRejectedValue(new NotFoundException());
      await expect(
        controller.update(mockHabit.id, mockLog.id, dto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove log by id', async () => {
      service.remove.mockResolvedValue(mockLog);

      const result = await controller.remove(mockHabit.id, mockLog.id);

      expect(mockService.remove).toHaveBeenCalledWith(1, 1);
      expect(mockService.remove).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockLog);
    });

    it('should propagate errors', async () => {
      mockService.remove.mockRejectedValue(new NotFoundException());
      await expect(controller.remove(mockHabit.id, mockLog.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
