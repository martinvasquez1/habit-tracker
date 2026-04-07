import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
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
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { UpdateUserResponse } from './dto/update-user-response';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MultiFileValidationPipe } from 'src/common/pipes/multi-file-validation-pipe';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profilePicture', maxCount: 1 },
        { name: 'coverPhoto', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads/users',
          filename: (req, file, cb) => {
            const unique = Date.now();
            const name = `${file.fieldname}-${unique}${extname(file.originalname)}`
            cb(null, name);
          },
        }),
      },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ operationId: 'updateUser' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles(new MultiFileValidationPipe([
      new FileTypeValidator({ fileType: /^image\/(png|jpeg)$/ }),
      new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
    ]))
    files: { profilePicture?: Express.Multer.File[], coverPhoto?: Express.Multer.File[] }
  ): Promise<UpdateUserResponse> {

    console.log(files)

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
