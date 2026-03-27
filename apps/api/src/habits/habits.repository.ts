import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Color, Habit } from './entities/habit.entity';
import { User } from 'src/users/entities/user.entity';
import { LogStatus } from 'src/logs/entities/log.entity';

import { UpdateHabitDto } from './dto/update-habit.dto';

@Injectable()
export class HabitsRepository {
  constructor(
    @InjectRepository(Habit) private readonly ORM: Repository<Habit>,
  ) {}

  async create(
    user: User,
    name: string,
    color: Color,
    description?: string,
  ): Promise<Habit> {
    const habit = await this.ORM.create({
      name,
      description,
      color,
      userId: user.id,
    });
    const savedHabit = this.ORM.save(habit);
    return savedHabit;
  }

  async findAll(user: User): Promise<Habit[]> {
    return await this.ORM.find({
      where: { user },
      order: { createdAt: 'ASC' },
    });
  }

  async findAllWithRangedLogs(
    userId: number,
    start: string,
    end: string,
  ): Promise<Habit[]> {
    return await this.ORM.createQueryBuilder('habit')
      .leftJoinAndMapMany(
        'habit.logs',
        'habit.logs',
        'log',
        'log.date BETWEEN :start AND :end',
        { start, end },
      )
      .where('habit.userId = :userId', { userId })
      .andWhere('habit.isArchived = false')
      .orderBy('habit.createdAt', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<Habit | null> {
    return await this.ORM.findOneBy({ id });
  }

  async findOneWithLogs(id: number, order: 'ASC' | 'DESC' = 'DESC'): Promise<Habit | null> {
    return await this.ORM.findOne({
      where: { id },
      relations: ['logs'],
      order: { logs: { date: order } }
    });
  }

  async update(habit: Habit, updateHabitDto: UpdateHabitDto): Promise<Habit> {
    const updatedFields = Object.assign(habit, updateHabitDto);
    return await this.ORM.save(updatedFields);
  }

  async remove(id: number) {
    const habit = await this.findOne(id);
    return await this.ORM.remove(habit!);
  }
}
