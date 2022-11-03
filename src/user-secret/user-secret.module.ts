import { Module } from '@nestjs/common';

import { UserSecretService } from './user-secret.service';

@Module({
  providers: [UserSecretService],
})
export class UserSecretModule {}
