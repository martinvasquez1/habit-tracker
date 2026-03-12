import { colors } from "@/styles/main";

export enum UserRole {
  ADMIN = "admin",
  BASIC = "basic",
}

export type User = {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  avatar: string;
};

export enum LogStatus {
  COMPLETED = "completed",
  SKIPPED = "skipped",
  MISSED = "missed",
}

export type Log = {
  id: number;
  date: string;
  status: LogStatus;
  note: string;
  habitId: number;
};

export type Habit = {
  id: number;
  name: string;
  description: string;
  streak: number;
  icon: string;
  isArchived: boolean;
  color: keyof typeof colors;
  logs: Log[];
};

export type Stats = {
  currentStreak: number;
  streaks: number[];
  amountOfLogs: number;
};
