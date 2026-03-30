import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from './stats.service';

import { Log } from 'src/logs/entities/log.entity';

describe('StatsService', () => {
  let service: StatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatsService],
    }).compile();

    service = module.get<StatsService>(StatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
});
