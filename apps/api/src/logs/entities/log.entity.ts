import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Habit } from 'src/habits/entities/habit.entity';

export enum LogStatus {
  COMPLETED = 'completed',
  SKIPPED = 'skipped',
  MISSED = 'missed',
}

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date; // Stores the date in YYYY-MM-DD format

  @CreateDateColumn()
  createdDate: Date;

  @Column({ type: 'enum', enum: LogStatus, default: LogStatus.MISSED })
  status: LogStatus;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ nullable: true })
  habitId: number;

  @ManyToOne(() => Habit, (habit) => habit.logs, { onDelete: 'CASCADE' })
  habit: Relation<Habit>;
}
