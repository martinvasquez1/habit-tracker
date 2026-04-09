import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private ORM: Repository<User>) { }

  async create(
    username?: string,
    email?: string,
    password?: string,
    role?: UserRole,
  ): Promise<User> {
    const user = this.ORM.create({ username, email, password, role });
    const savedUser = this.ORM.save(user);
    return savedUser;
  }

  async findOne(id: number) {
    return await this.ORM.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.ORM.findOne({ where: [{ email }] });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.ORM.findOne({ where: [{ username }] });
  }

  private removeUndefinedFields<T extends object>(input: T): Partial<T> {
    const entries = Object.entries(input);

    const filteredEntries = entries.filter(
      ([_, value]) => value !== undefined
    );

    return Object.fromEntries(filteredEntries) as Partial<T>;
  }

  async update(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    const cleanedDto = this.removeUndefinedFields(updateUserDto);
    const updatedFields = Object.assign(user, cleanedDto);
    return await this.ORM.save(updatedFields);
  }

  async remove(id: number) {
    return await this.ORM.delete(id);
  }
}
