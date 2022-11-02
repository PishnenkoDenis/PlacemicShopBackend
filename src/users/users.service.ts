import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Transaction } from 'sequelize';

import { UserPasswordParamsInterface } from './interfaces/create-password.interface';
import { Password } from './password.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Password)
    private passwordRepository: typeof Password,
  ) {}

  async createPassword(
    passwordParam: UserPasswordParamsInterface,
    transaction?: Transaction,
  ): Promise<Password> {
    const hash = await bcrypt.hash(passwordParam.password, 10);

    return this.passwordRepository.create(
      {
        hash,
        userId: passwordParam.userId,
      },
      {
        transaction,
      },
    );
  }
}
