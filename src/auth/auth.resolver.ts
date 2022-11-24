import { Inject, Req, Res } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { serverResponseOK } from 'src/config';
import { User } from 'src/users/user.model';

import { AuthService } from './auth.service';
import { LoginViaEmailDto } from './dto/login-via-email.dto';
import { CreateUserDto } from './dto/registrate-user.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  @Mutation(() => User)
  async loginUser(
    @Args('user') user: LoginViaEmailDto,
    @Res({ passthrough: true }) res: ResponseType,
  ) {
    const tokens = await this.authService.login(user);
    this.authService.setTokens(res, tokens);

    return serverResponseOK;
  }

  @Query(() => User)
  async refresh(@Req() req, @Res() res: ResponseType) {
    const access = req.cookies['access_token'];
    const refresh = req.cookies['refresh_token'];
    const tokens = await this.authService.refresh(res, { access, refresh });

    this.authService.setTokens(res, tokens);

    return serverResponseOK;
  }

  @Mutation(() => User)
  async createUser(@Args('dto') dto: CreateUserDto): Promise<string> {
    return await this.authService.createUser(dto);
  }
}
