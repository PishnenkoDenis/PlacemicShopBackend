import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

import { ERoles, VALID_PASSWORD_REGEXP } from '../../config';

export class CreateUserDto {
  @ApiProperty({ example: 'jhon.doe@gmail.com', description: 'User email' })
  @IsString({ message: 'Email should be string' })
  @IsNotEmpty({ message: 'Email required' })
  @MaxLength(255, { message: 'Email is too long' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @ApiProperty({ example: 'Jhon Doe', description: 'User full name' })
  @IsNotEmpty({ message: 'Full name required' })
  @IsString({ message: 'Invalid full name' })
  @MaxLength(255, { message: 'Full name is too long' })
  readonly fullName: string;

  @ApiProperty({ example: 'Password_1', description: 'User password' })
  @IsNotEmpty({ message: 'Password required' })
  @IsString({ message: 'Password should be string' })
  @Matches(VALID_PASSWORD_REGEXP, { message: 'Invalid password' })
  readonly password: string;

  @ApiPropertyOptional({
    example: '+1 900 999 99 99',
    description: 'User phone number. Ex.: +1 900 999 99 99',
  })
  @IsOptional()
  @IsPhoneNumber()
  @IsString({ message: 'Phone number should be string' })
  readonly phone?: string;

  @ApiPropertyOptional({
    description: `Admin birthday. Ex.: ${new Date('01.01.1970')}`,
  })
  @IsOptional()
  readonly birthday?: Date;

  @ApiPropertyOptional({
    description: `User role`,
  })
  @IsOptional()
  readonly role?: ERoles;
}
