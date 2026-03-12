import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { PaginateOptionsDto } from 'src/common/paginate/dto/paginate-options.dto';

import { PolicyGuard } from 'src/casl/policy.guard';
import { CheckPolicies } from 'src/casl/check-policies.decorator';
import { ReadAllUsersPolicy } from './policies/read-all-users-policy';
import { ReadUserPolicy } from './policies/read-user-policy';
import { UpdateUserPolicy } from './policies/update-user-policy';
import { DeleteUserPolicy } from './policies/delete-user-policy';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(PolicyGuard)
  @CheckPolicies(ReadAllUsersPolicy)
  @ApiOperation({ operationId: 'getUsers' })
  async findAll(@Query() options: PaginateOptionsDto<User>) {
    return this.usersService.findAll(options);
  }

  @Get(':id')
  @UseGuards(PolicyGuard)
  @CheckPolicies(ReadUserPolicy)
  @ApiOperation({ operationId: 'getUser' })
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(PolicyGuard)
  @CheckPolicies(UpdateUserPolicy)
  @ApiOperation({ operationId: 'createUser' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(PolicyGuard)
  @CheckPolicies(DeleteUserPolicy)
  @ApiOperation({ operationId: 'deleteUser' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.remove(+id);
  }
}
