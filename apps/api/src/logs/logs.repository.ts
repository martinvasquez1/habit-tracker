import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Habit } from 'src/habits/entities/habit.entity';
import { Log, LogStatus } from './entities/log.entity';
import { UpdateLogDto } from './dto/update-log.dto';

@Injectable()
export class LogsRepository {
  constructor(@InjectRepository(Log) private readonly ORM: Repository<Log>) {}

  async create(
    status: LogStatus,
    date: string,
    habit: Habit,
    note?: string,
  ): Promise<Log> {
    const log = this.ORM.create({ status, date, note, habitId: habit.id });
    const savedLog = this.ORM.save(log);
    return savedLog;
  }

  async findAll(habitId: number): Promise<Log[]> {
    return await this.ORM.find({
      where: { habit: { id: habitId } },
    });
  }

  async findAllRanged(
    habitId: number,
    start: string,
    end: string,
  ): Promise<Log[]> {
    return await this.ORM.createQueryBuilder('log')
      .where('log.habitId = :habitId', { habitId })
      .andWhere('log.date >= :start', { start })
      .andWhere('log.date <= :end', { end })
      .orderBy('log.date', 'ASC')
      .getMany();
  }

  async findOne(habitId: number, logId: number): Promise<Log | null> {
    return await this.ORM.findOne({
      where: {
        id: logId,
        habit: { id: habitId },
      },
    });
  }

  async update(log: Log, updateLodDto: UpdateLogDto): Promise<Log> {
    const updatedFields = Object.assign(log, updateLodDto);
    return await this.ORM.save(updatedFields);
  }

  async remove(log: Log): Promise<Log> {
    return await this.ORM.remove(log);
  }

  async doesLogExistForDate(habit: Habit, date: string): Promise<boolean> {
    return await this.ORM.createQueryBuilder('log')
      .where('log.habitId = :habitId', { habitId: habit.id })
      .andWhere('log.date = :date', { date })
      .getExists();
  }
}
