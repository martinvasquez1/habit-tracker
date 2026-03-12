import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Habit } from 'src/habits/entities/habit.entity';

export enum UserRole {
  ADMIN = 'admin',
  BASIC = 'basic',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.BASIC })
  role: UserRole;

  @OneToMany(() => Habit, (habit) => habit.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  habits: Relation<Habit[]>;
}
