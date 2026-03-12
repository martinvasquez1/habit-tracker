import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { HabitsService } from 'src/habits/habits.service';

import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { LogsRepository } from './logs.repository';
import { Log } from './entities/log.entity';

@Injectable()
export class LogsService {
  constructor(
    private readonly logsRepository: LogsRepository,
    private readonly habitsService: HabitsService,
  ) {}

  async create(habitId: number, createLogDto: CreateLogDto) {
    const habit = await this.habitsService.findOne(habitId);

    const { date, status, note } = createLogDto;

    if (await this.logsRepository.doesLogExistForDate(habit, date)) {
      throw new ConflictException('A log for that date already exists');
    }

    return this.logsRepository.create(status, date, habit, note);
  }

  async findAll(habitId: number) {
    await this.habitsService.findOne(habitId);
    return await this.logsRepository.findAll(habitId);
  }

  async findAllRanged(habitId: number, startDate: Date, endDate: Date) {
    await this.habitsService.findOne(habitId);

    const start = startDate.toISOString().substring(0, 10);
    const end = endDate.toISOString().substring(0, 10);
    return await this.logsRepository.findAllRanged(habitId, start, end);
  }

  async findOne(habitId: number, logId: number): Promise<Log> {
    const log = await this.logsRepository.findOne(habitId, logId);
    if (!log) throw new NotFoundException(`Log with id ${logId} not found`);
    return log;
  }

  async update(
    habitId: number,
    logId: number,
    updateLogDto: UpdateLogDto,
  ): Promise<Log> {
    await this.habitsService.findOne(habitId);
    const log = await this.findOne(habitId, logId);

    // Log's won't be able to update date (for now)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { date, ...payload } = updateLogDto;
    return await this.logsRepository.update(log, updateLogDto);
  }

  async remove(habitId: number, logId: number) {
    const log = await this.findOne(habitId, logId);
    return await this.logsRepository.remove(log);
  }
}
