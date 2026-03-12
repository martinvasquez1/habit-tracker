import {
  Controller,
  ParseIntPipe,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';

import { User } from 'src/common/decorators/user.decorator';

import { DateRangeLogsQueryDto } from './dto/date-range-logs.dto';
import { GetStreakQueryDto } from './dto/get-streak-query.dto';

import { PolicyGuard } from 'src/casl/policy.guard';
import { CheckPolicies } from 'src/casl/check-policies.decorator';
import { CreateHabitPolicy } from './policies/create-habit-policy';
import { ReadHabitPolicy } from './policies/read-habit-policy';
import { UpdateHabitPolicy } from './policies/update-habit-policy';
import { DeleteHabitPolicy } from './policies/delete-habit-policy';

import { Habit } from './entities/habit.entity';
import { GetStatsResponseDto } from './dto/get-stats-response.dto';
import { CreateHabitResponseDto } from './dto/create-habit-response.dto';
import { FindAllHabitsResponseDto } from './dto/find-all-response.dto';
import { FindAllHabitsWithLogsResponseDto } from './dto/find-all-with-logs-response.dto';
import { FindOneHabitResponseDto } from './dto/find-one-response.dto';
import { UpdateHabitResponseDto } from './dto/update-habit-response.dto';
import { DeleteHabitResponseDto } from './dto/delete-habit-response.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  @UseGuards(PolicyGuard)
  @CheckPolicies(CreateHabitPolicy)
  @ApiOperation({ operationId: 'createHabit' })
  create(
    @User('id') userId: number,
    @Body() createHabitDto: CreateHabitDto,
  ): Promise<CreateHabitResponseDto> {
    return this.habitsService.create(userId, createHabitDto);
  }

  @Get()
  @ApiOperation({ operationId: 'getHabits' })
  findAll(@User('id') userId: number): Promise<FindAllHabitsResponseDto> {
    return this.habitsService.findAll(userId);
  }

  @Get('/logs')
  @ApiOperation({ operationId: 'getHabitsWithLogs' })
  findAllWithLogs(
    @User('id') userId: number,
    @Query() query: DateRangeLogsQueryDto,
  ): Promise<FindAllHabitsWithLogsResponseDto> {
    const startDate = new Date(`${query.startDate}T00:00:00Z`);
    const endDate = new Date(`${query.endDate}T00:00:00Z`);
    const currentDate = new Date(`${query.currentDate}T00:00:00Z`);

    return this.habitsService.findAllWithLogs(
      userId,
      startDate,
      endDate,
      currentDate,
    );
  }

  @Get(':id/stats')
  @UseGuards(PolicyGuard)
  @CheckPolicies(ReadHabitPolicy)
  @ApiOperation({ operationId: 'getHabitStats' })
  async getStats(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: GetStreakQueryDto,
  ): Promise<GetStatsResponseDto> {
    const currentDate = new Date(`${query.currentDate}T00:00:00Z`);
    return this.habitsService.getStats(+id, currentDate);
  }

  @Get(':id')
  @UseGuards(PolicyGuard)
  @CheckPolicies(ReadHabitPolicy)
  @ApiOperation({ operationId: 'getHabit' })
  async findOne(@Param('id') id: string): Promise<FindOneHabitResponseDto> {
    return this.habitsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(PolicyGuard)
  @CheckPolicies(UpdateHabitPolicy)
  @ApiOperation({ operationId: 'updateHabit' })
  async update(
    @Param('id') id: string,
    @Body() updateHabitDto: UpdateHabitDto,
  ): Promise<UpdateHabitResponseDto> {
    return this.habitsService.update(+id, updateHabitDto);
  }

  @Delete(':id')
  @UseGuards(PolicyGuard)
  @CheckPolicies(DeleteHabitPolicy)
  @ApiOperation({ operationId: 'deleteHabit' })
  async remove(@Param('id') id: string): Promise<DeleteHabitResponseDto> {
    return this.habitsService.remove(+id);
  }

  @Get(':id/streak')
  @UseGuards(PolicyGuard)
  @CheckPolicies(ReadHabitPolicy)
  async getStreak(@Param('id') id: string, @Query() query: GetStreakQueryDto) {
    const currentDate = new Date(query.currentDate);
    return this.habitsService.getStreak(+id, currentDate);
  }
}
