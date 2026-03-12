import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Log } from 'src/logs/entities/log.entity';

export enum Color {
  RED = 'red',
  ORANGE = 'orange',
  YELLOW = 'yellow',
  GREEN = 'green',
  MINT = 'mint',
  CYAN = 'cyan',
  BLUE = 'blue',
  INDIGO = 'indigo',
  PURPLE = 'purple',
  PINK = 'pink',
  BROWN = 'brown',
  GRAY = 'gray',
}

@Entity()
export class Habit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ type: 'enum', enum: Color })
  color: Color;

  @Column({ default: false })
  isArchived: boolean;

  @ManyToOne(() => User, (user) => user.habits, { onDelete: 'CASCADE' })
  user: Relation<User>;

  @Column({ nullable: false })
  userId: number;

  @OneToMany(() => Log, (log) => log.habit, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  logs: Relation<Log[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
