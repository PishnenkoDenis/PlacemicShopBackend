import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Transaction } from 'sequelize';

import { Password } from './password.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Password)
    private passwordRepository: typeof Password,
  ) {}

  async createPassword(
    createPasswordDto: { userId: number; password: string },
    transaction?: Transaction,
  ): Promise<Password> {
    const hash = await bcrypt.hash(createPasswordDto.password, 10);

    return this.passwordRepository.create(
      {
        hash,
        userId: createPasswordDto.userId,
      },
      {
        transaction,
      },
    );
  }
}
