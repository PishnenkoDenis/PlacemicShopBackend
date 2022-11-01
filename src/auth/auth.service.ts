import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ServerMessages } from 'src/config';
import { User } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
import { forbiddenError } from 'src/utils/errors';

import { CreateUserDto } from './dto/registrate-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private userService: UsersService,
  ) {}

  async validateUser(email: string): Promise<void> {
    const userRecord = await this.userRepository.findOne({
      attributes: ['email', 'id'],
      where: {
        email: email,
      },
    });
    if (userRecord) {
      forbiddenError();
    }
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
