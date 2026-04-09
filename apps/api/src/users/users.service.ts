import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
import { User, UserRole } from './entities/user.entity';

import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserDtoWithPaths } from './dto/update-user.dto';
import { PaginateOptionsDto } from 'src/common/paginate/dto/paginate-options.dto';

import paginate from 'src/common/paginate/paginate';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async create(createUserDto: CreateUserDto, role?: UserRole): Promise<User> {
    const { username, email } = createUserDto;

    const existingEmail = await this.usersRepository.findByEmail(email);
    const existingName = await this.usersRepository.findByUsername(username);

    if (existingEmail) throw new ConflictException('Email already exists');
    if (existingName) throw new ConflictException('Username already exists');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create(
      username,
      email,
      hashedPassword,
      role,
    );

    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new NotFoundException(`User not found`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDtoWithPaths): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const updatedUser = await this.usersRepository.update(user, updateUserDto);

    return updatedUser;
  }

  async remove(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    await this.usersRepository.remove(id);
    return user;
  }
}
