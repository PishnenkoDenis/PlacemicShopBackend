import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Password } from './password.model';
import { User } from './user.model';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, UsersResolver],
  imports: [SequelizeModule.forFeature([User, Password])],
  exports: [UsersService],
})
export class UsersModule {}
