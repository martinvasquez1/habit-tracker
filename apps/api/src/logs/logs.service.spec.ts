import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { HabitsService } from 'src/habits/habits.service';
import { LogsRepository } from './logs.repository';
import { LogsService } from './logs.service';

import { Habit } from 'src/habits/entities/habit.entity';
import { Log, LogStatus } from './entities/log.entity';

import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

const mockHabit = {
  id: 1,
  name: 'Workout',
} as Habit;

describe('LogsService', () => {
  let service: LogsService;
  let logsRepository: jest.Mocked<LogsRepository>;
  let habitsService: jest.Mocked<HabitsService>;

  const mockLogsRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllRanged: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    doesLogExistForDate: jest.fn(),
  };

  const mockHabitsService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LogsService,
        {
          provide: LogsRepository,
          useValue: mockLogsRepository,
        },
        {
          provide: HabitsService,
          useValue: mockHabitsService,
        },
      ],
    }).compile();

    service = module.get<LogsService>(LogsService);
    logsRepository = module.get(LogsRepository);
    habitsService = module.get(HabitsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto = {
      date: '2000, 01, 01',
      status: LogStatus.COMPLETED,
      note: '',
    } as CreateLogDto;

    it('should create a new log if no log exists for that date', async () => {
      const expected = {} as Log;

      habitsService.findOne.mockResolvedValue(mockHabit);
      logsRepository.doesLogExistForDate.mockResolvedValue(false);
      logsRepository.create.mockResolvedValue(expected);

      const result = await service.create(mockHabit.id, dto);

      expect(result).toEqual(expected);
    });

    it('should throw ConflictException if a log already exists for that date', async () => {
      habitsService.findOne.mockResolvedValue(mockHabit);
      logsRepository.doesLogExistForDate.mockResolvedValue(true);
      await expect(service.create(99, dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return all logs', async () => {
      const expected = [] as Log[];
      habitsService.findOne.mockResolvedValue(mockHabit);
      logsRepository.findAll.mockResolvedValue(expected);

      const result = await service.findAll(mockHabit.id);

      expect(result).toEqual(expected);
    });
  });

  describe('findAllRanged', () => {
    it('should return all logs ranged', async () => {
      const expected = [] as Log[];
      habitsService.findOne.mockResolvedValue(mockHabit);
      logsRepository.findAllRanged.mockResolvedValue(expected);

      const result = await service.findAllRanged(
        mockHabit.id,
        new Date(),
        new Date(),
      );

      expect(result).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return log', async () => {
      const mockId = 1;
      const expected = {} as Log;

      logsRepository.findOne.mockResolvedValue(expected);
      const result = await service.findOne(mockHabit.id, mockId);

      expect(result).toEqual(expected);
    });

    it('should throw if log not found', async () => {
      logsRepository.findOne.mockRejectedValue(new NotFoundException());
      await expect(service.findOne(mockHabit.id, 99)).rejects.toThrow(
        new NotFoundException(),
      );
    });
  });

  describe('update', () => {
    it('should update log', async () => {
      const mockId = 1;

      const dto = {} as UpdateLogDto;
      const log = {} as Log;
      const expected = {} as Log;

      habitsService.findOne.mockResolvedValue(mockHabit);
      logsRepository.findOne.mockResolvedValue(log);
      logsRepository.update.mockResolvedValue(expected);

      const result = await service.update(mockHabit.id, mockId, dto);

      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should remove log', async () => {
      const mockId = 1;
      const log = {} as Log;
      const expected = {} as Log;

      jest.spyOn(service, 'findOne').mockResolvedValue(log);
      logsRepository.remove.mockResolvedValue(log);

      const result = await service.remove(mockHabit.id, mockId);

      expect(result).toEqual(expected);
    });
  });
});
