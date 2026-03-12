import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User, UserRole } from 'src/users/entities/user.entity';

type Response = {
  accessToken: string;
  userId: number;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateToken(user: User) {
    const { username, id, role } = user;
    const payload = { sub: user.id, username, id, role };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async signUp(signUpDto: SignUpDto, role?: UserRole): Promise<Response> {
    const newUser = await this.usersService.create(signUpDto, role);
    const accessToken = await this.generateToken(newUser);
    return { accessToken, userId: newUser.id };
  }

  async signIn(signInDto: SignInDto): Promise<Response> {
    const user = await this.usersService.findByEmail(signInDto.email);

    const isWrongPassword = !(await bcrypt.compare(
      signInDto.password,
      user.password,
    ));
    if (isWrongPassword) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.generateToken(user);
    return { accessToken, userId: user.id };
  }
}
