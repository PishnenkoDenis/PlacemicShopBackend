import { Inject } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/user.model';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/registrate-user.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  @Mutation(() => User)
  async createUser(dto: CreateUserDto): Promise<string> {
    return await this.authService.createUser(dto);
  }
}