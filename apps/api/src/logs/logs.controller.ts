import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { LogsService } from './logs.service';

import { PolicyGuard } from 'src/casl/policy.guard';
import { CheckPolicies } from 'src/casl/check-policies.decorator';
import { CreateLogPolicy } from './policies/create-log-policy';
import { ReadLogPolicy } from './policies/read-log-policy';
import { UpdateLogPolicy } from './policies/update-log-policy';
import { DeleteLogPolicy } from './policies/delete-log-policy';

import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { DateRangeQueryDto } from './dto/date-range-query.dto';
import { CreateLogResponseDto } from './dto/create-log-response.dto';
import { FindAllLogsResponseDto } from './dto/find-all-logs-response.dto';
import { FindOneLogResponseDto } from './dto/find-one-log-response.dto';
import { UpdateLogResponseDto } from './dto/update-log-response.dto';
import { DeleteLogResponseDto } from './dto/delete-log-response.dto';
import { ApiOperation } from '@nestjs/swagger';


@Controller('habits/:habitId/logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  @UseGuards(PolicyGuard)
  @CheckPolicies(CreateLogPolicy)
  @ApiOperation({ operationId: 'createLog' })
  async create(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Body() createLogDto: CreateLogDto,
  ): Promise<CreateLogResponseDto> {
    return this.logsService.create(habitId, createLogDto);
  }

  /**
  * Retrieves logs for a specific habit.
  *
  * @remarks
  * Optionally filters logs using a date range.  
  * The `startDate` and `endDate` query parameters must be **strings representing
  * the user's local date** in `YYYY-MM-DD` format.
  */
  @Get()
  @UseGuards(PolicyGuard)
  @CheckPolicies(ReadLogPolicy)
  @ApiOperation({ operationId: 'getLogs' })
  async findAll(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Query() query: DateRangeQueryDto,
  ): Promise<FindAllLogsResponseDto> {
    if (query.startDate || query.endDate) {
      const startDate = new Date(`${query.startDate}T00:00:00Z`);
      const endDate = new Date(`${query.endDate}T00:00:00Z`);

      return this.logsService.findAllRanged(habitId, startDate, endDate);
    }

    return this.logsService.findAll(habitId);
  }

  @Get(':logId')
  @UseGuards(PolicyGuard)
  @CheckPolicies(ReadLogPolicy)
  @ApiOperation({ operationId: 'getLog' })
  async findOne(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Param('logId', ParseIntPipe) logId: number,
  ): Promise<FindOneLogResponseDto> {
    return this.logsService.findOne(habitId, logId);
  }

  @Patch(':logId')
  @UseGuards(PolicyGuard)
  @CheckPolicies(UpdateLogPolicy)
  @ApiOperation({ operationId: 'updateLog' })
  async update(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Param('logId', ParseIntPipe) logId: number,
    @Body() updateLogDto: UpdateLogDto,
  ): Promise<UpdateLogResponseDto>{
    return this.logsService.update(habitId, logId, updateLogDto);
  }

  @Delete(':logId')
  @UseGuards(PolicyGuard)
  @CheckPolicies(DeleteLogPolicy)
  @ApiOperation({ operationId: 'deleteLog' })
  async remove(
    @Param('habitId', ParseIntPipe) habitId: number,
    @Param('logId', ParseIntPipe) logId: number,
  ): Promise<DeleteLogResponseDto>{
    return this.logsService.remove(habitId, logId);
  }
}
