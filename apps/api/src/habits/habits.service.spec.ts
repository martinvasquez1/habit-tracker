import { Test } from '@nestjs/testing';

import { HabitsService } from './habits.service';
import { HabitsRepository } from './habits.repository';
import { UsersService } from 'src/users/users.service';

import { Color, Habit } from './entities/habit.entity';

import { CreateHabitDto } from './dto/create-habit.dto';
import { User } from 'src/users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { Log } from 'src/logs/entities/log.entity';

const mockHabit = {
  id: 1,
  name: 'Workout',
} as Habit;

const mockHabit2 = {
  id: 2,
  name: 'Coding',
} as Habit;

describe('HabitsService', () => {
  let service: HabitsService;
  let habitsRepository: jest.Mocked<HabitsRepository>;
  let usersService: jest.Mocked<UsersService>;

  const mockHabitsRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAllWithRangedLogs: jest.fn(),
    findAllWithCompletedLogs: jest.fn(),
    findOneWithLogs: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockUsersService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        HabitsService,
        {
          provide: HabitsRepository,
          useValue: mockHabitsRepository,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<HabitsService>(HabitsService);
    habitsRepository = module.get(HabitsRepository);
    usersService = module.get(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto: CreateHabitDto = {
      name: 'Workout',
      description: '...',
      color: Color.BLUE, 
    };

    it('should create a habit for the user', async () => {
      const user = { id: 1, username: 'Bob' } as User;
      const habit = { id: 1, ...dto, user } as Habit;

      usersService.findOne.mockResolvedValue(user);
      habitsRepository.create.mockResolvedValue(habit);

      const result = await service.create(user.id, dto);

      expect(result).toEqual(habit);
    });

    it('should throw if user not found', async () => {
      usersService.findOne.mockRejectedValue(new Error('User not found'));
      await expect(service.create(99, dto)).rejects.toThrow(
        new NotFoundException('User not found'),
      );
    });
  });

  describe('findAll', () => {
    it('should return all habits for a user', async () => {
      const user = { id: 1, username: 'Bob' } as User;
      const mockHabits = [mockHabit];

      usersService.findOne.mockResolvedValue(user);
      habitsRepository.findAll.mockResolvedValue(mockHabits);

      const result = await service.findAll(user.id);

      expect(result).toEqual(mockHabits);
    });

    it('should throw if user not found', async () => {
      usersService.findOne.mockRejectedValue(new Error('User not found'));
      await expect(service.findAll(99)).rejects.toThrow(
        new NotFoundException('User not found'),
      );
    });
  });

  describe('findAllWithLogs', () => {
    it('should return habits with logs', async () => {
      const user = { id: 1, username: 'Bob' } as User;
      const mockHabits = [mockHabit, mockHabit2];
      const streak = 777;

      usersService.findOne.mockResolvedValue(user);
      habitsRepository.findAllWithRangedLogs.mockResolvedValue(mockHabits);
      jest.spyOn(service, 'calculateStreak').mockImplementation(() => streak);

      const startDate = new Date('2001-01-01');
      const endDate = new Date('2001-01-30');
      const currentDate = new Date('2000-01-15');

      const result = await service.findAllWithLogs(
        user.id,
        startDate,
        endDate,
        currentDate,
      );

      const expected = result.map((habit) => ({ ...habit, streak }));
      expect(result).toEqual(expected);
    });

    it('should return an empty array if no habits found', async () => {
      const user = { id: 1, username: 'Bob' } as User;

      usersService.findOne.mockResolvedValue(user);
      habitsRepository.findAllWithRangedLogs.mockResolvedValue([]);

      const startDate = new Date('2001-01-01');
      const endDate = new Date('2001-01-30');
      const currentDate = new Date('2000-01-15');

      const result = await service.findAllWithLogs(
        user.id,
        startDate,
        endDate,
        currentDate,
      );

      expect(result).toEqual([]);
    });

    it('should throw if user not found', async () => {
      const startDate = new Date('2001-01-01');
      const endDate = new Date('2001-01-30');
      const currentDate = new Date('2000-01-15');

      usersService.findOne.mockRejectedValue(new Error('User not found'));

      await expect(
        service.findAllWithLogs(99, startDate, endDate, currentDate),
      ).rejects.toThrow(new NotFoundException('User not found'));
    });
  });

  describe('findOne', () => {
    it('should return the habit if found', async () => {
      habitsRepository.findOne.mockResolvedValue(mockHabit);
      const result = await service.findOne(1);
      expect(result).toEqual(mockHabit);
    });

    it('should throw NotFoundException if habit not found', async () => {
      habitsRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateDto = { name: 'New Name' } as UpdateHabitDto;

    it('should update the habit', async () => {
      const updatedHabit = { ...mockHabit, ...updateDto } as Habit;

      habitsRepository.findOne.mockResolvedValue(mockHabit);
      habitsRepository.update.mockResolvedValue(updatedHabit);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(updatedHabit);
    });

    it('should throw NotFoundException if habit not found', async () => {
      habitsRepository.findOne.mockResolvedValue(null);
      await expect(service.update(99, updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove the habit', async () => {
      habitsRepository.findOne.mockResolvedValue(mockHabit);
      habitsRepository.remove.mockResolvedValue(mockHabit);

      const result = await service.remove(1);

      expect(result).toEqual(mockHabit);
    });

    it('should throw NotFoundException if habit not found', async () => {
      habitsRepository.findOne.mockResolvedValue(null);
      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('calculateStreak', () => {
    const currentDateStr: string = '2000-06-03';
    const currentDate = new Date(`${currentDateStr}T00:00:00Z`);

    it('should return 0 if no logs', () => {
      expect(service.calculateStreak([], currentDate)).toBe(0);
    });

    it('should count consecutive logs including today', () => {
      const logs = [
        { date: '2000-06-01' } as unknown as Log,
        { date: '2000-06-02' } as unknown as Log,
        { date: '2000-06-03' } as unknown as Log,
      ];

      expect(service.calculateStreak(logs, currentDate)).toBe(3);
    });

    it('should stop streak at first missing day', () => {
      const logs = [
        { date: '2000-06-01' } as unknown as Log,
        { date: '2000-06-02' } as unknown as Log,
      ];

      expect(service.calculateStreak(logs, currentDate)).toBe(0);
    });

    it('should handle single log today', () => {
      const log = { date: '2000-06-03' } as unknown as Log;
      expect(service.calculateStreak([log], currentDate)).toBe(1);
    });
  });

  describe('calculateStreaks', () => {
    it('should return empty array if no logs', () => {
      expect(service.calculateStreaks([])).toEqual([]);
    });

    it('should handle a single log as streak of 1', () => {
      const logs: Log[] = [{ date: '2000-06-01' } as unknown as Log];
      expect(service.calculateStreaks(logs)).toEqual([1]);
    });

    it('should return single streak for consecutive logs', () => {
      const logs: Log[] = [
        { date: '2000-06-01' } as unknown as Log,
        { date: '2000-06-02' } as unknown as Log,
        { date: '2000-06-03' } as unknown as Log,
      ];
      expect(service.calculateStreaks(logs)).toEqual([3]);
    });

    it('should handle multiple streaks separated by gaps', () => {
      const logs: Log[] = [
        { date: '2000-06-01' } as unknown as Log,
        { date: '2000-06-02' } as unknown as Log,
        { date: '2000-06-04' } as unknown as Log,
        { date: '2000-06-05' } as unknown as Log,
        { date: '2000-06-06' } as unknown as Log,
      ];
      expect(service.calculateStreaks(logs)).toEqual([3, 2]);
    });

    it('should treat non-consecutive single-day logs as separate streaks', () => {
      const logs: Log[] = [
        { date: '2000-06-01' } as unknown as Log,
        { date: '2000-06-03' } as unknown as Log,
        { date: '2000-06-05' } as unknown as Log,
      ];
      expect(service.calculateStreaks(logs)).toEqual([1, 1, 1]);
    });
  });

  describe('getStreak', () => {
    it('should get habit with streak', async () => {
      const mockLog = { date: '2000-06-01' } as unknown as Log;
      const mockHabitsWithLogs = { ...mockHabit, logs: [mockLog] };
      const today: Date = new Date('2000-06-01');

      habitsRepository.findOne.mockResolvedValue(mockHabit);
      habitsRepository.findOneWithLogs.mockResolvedValue(mockHabitsWithLogs);

      const result = await service.getStreak(1, today);

      expect(result).toEqual(1);
    });

    it('should throw NotFoundException if habit not found', async () => {
      habitsRepository.findOne.mockResolvedValue(null);
      await expect(service.getStreak(99, new Date())).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getStats', () => {
    it('should return empty stats when no logs exist', async () => {
      const mockHabitsWithCompleteLogs = [{ ...mockHabit, logs: [] }];
      habitsRepository.findAllWithCompletedLogs.mockResolvedValue(
        mockHabitsWithCompleteLogs,
      );
      const result = await service.getStats(1, new Date());

      expect(result).toEqual({
        currentStreak: 0,
        streaks: [],
        amountOfLogs: 0,
      });
    });

    it('should return stats', async () => {
      const logs: Log[] = [
        { date: '2000-06-01' } as unknown as Log,
        { date: '2000-06-02' } as unknown as Log,
      ];
      const currentDayStr: string = '2000-06-02';
      const currentDay = new Date(`${currentDayStr}T00:00:00Z`);
      const mockHabitsWithCompleteLogs = [{ ...mockHabit, logs }];

      habitsRepository.findAllWithCompletedLogs.mockResolvedValue(
        mockHabitsWithCompleteLogs,
      );
      const result = await service.getStats(mockHabit.id, currentDay);

      expect(result).toEqual({
        currentStreak: 2,
        streaks: [2],
        amountOfLogs: 2,
      });
    });
  });
});
