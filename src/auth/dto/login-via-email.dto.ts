import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

import { VALID_PASSWORD_REGEXP } from '../../config';

export class LoginViaEmailDto {
  @IsNotEmpty({ message: 'Email required' })
  @IsString({ message: 'Email should be string' })
  @MaxLength(255, { message: 'Email is too long' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password required' })
  @IsString({ message: 'Password should be string' })
  @Matches(VALID_PASSWORD_REGEXP, { message: 'Invalid password' })
  readonly password: string;
}
