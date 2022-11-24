import { Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Envs, ERoles, ServerMessages } from 'src/config';
import { UserSecretService } from 'src/user-secret/user-secret.service';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { forbiddenError } from 'src/utils/errors';

import { LoginViaEmailDto } from './dto/login-via-email.dto';
import { CreateUserDto } from './dto/registrate-user.dto';

export interface ITokens {
  access: string;
  refresh: string;
}

export interface loginInterface {
  isAdmin?: boolean;
  roles?: ERoles[];
}

export interface IUserAccessToken {
  role: ERoles;
  secret: string;
  email: string;
  id: number;
}

export interface IUserRefreshToken {
  role: ERoles;
  secret: string;
  email: string;
  id: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private userService: UsersService,
    private jwtService: JwtService,
    private userSecretService: UserSecretService,
  ) {}

  async login(@Body() user: LoginViaEmailDto) {
    const userRecord = await this.validateUser(user.email);

    const secret = await this.userSecretService.getOrCreateUserSecret(
      userRecord.id,
    );
    const tokens = await this.generateTokens(userRecord, secret);
    await this.userService.createRefreshToken(userRecord.id, tokens.refresh);

    return tokens;
  }

  clearTokens(res: ResponseType) {
    this.setTokens(res, null, 0);
  }

  setTokens(res, tokens?: ITokens, date?: number) {
    const expiresAccess =
      date ?? Date.now() + Number(process.env.JWT_ACCESS_EXPIRES_IN) * 1000;
    const expiresRefresh =
      date ?? Date.now() + Number(process.env.JWT_REFRESH_EXPIRES_IN) * 1000;

    res
      .cookie('access_token', tokens?.access, {
        httpOnly: true,
        path: '/',
        ...(process.env.NODE_ENV !== Envs.development && {
          sameSite: 'none',
          secure: true,
        }),
        domain: process.env.DOMAIN,
        expires: new Date(expiresAccess),
      })
      .cookie('refresh_token', tokens?.refresh, {
        httpOnly: true,
        path: '/',
        ...(process.env.NODE_ENV !== Envs.development && {
          sameSite: 'none',
          secure: true,
        }),
        domain: process.env.DOMAIN,
        expires: new Date(expiresRefresh),
      });
  }

  private async generateTokens(user: User, secret: string) {
    const accessPayload = {
      secret,
      roleName: user.role,
      email: user.email,
      id: user.id,
    };
    const refreshPayload = {
      secret,
      roleName: user.role,
      email: user.email,
      id: user.id,
    };

    return {
      access: this.jwtService.sign(accessPayload, {
        expiresIn:
          Date.now() + Number(process.env.JWT_ACCESS_EXPIRES_IN) * 1000,
        secret: process.env.JWT_ACCESS_SECRET,
      }),
      refresh: this.jwtService.sign(refreshPayload, {
        expiresIn:
          Date.now() + Number(process.env.JWT_REFRESH_EXPIRES_IN) * 1000,
        secret: process.env.JWT_REFRESH_SECRET,
      }),
    };
  }

  async validateUser(email: string): Promise<User> {
    const userRecord = await this.userRepository.findOne({
      attributes: ['email', 'id'],
      where: {
        email: email,
      },
    });
    if (userRecord) {
      forbiddenError();
    }

    return userRecord;
  }

  async createUser(dto: CreateUserDto): Promise<string> {
    const { password, ...userParams } = dto;

    await this.validateUser(userParams.email);

    const userRecord = await this.userRepository.create({
      ...userParams,
    });

    await this.userService.createPassword({ userId: userRecord.id, password });

    return ServerMessages.CREATED;
  }
}
