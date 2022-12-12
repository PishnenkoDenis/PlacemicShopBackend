import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';
import { VALID_PASSWORD_REGEXP } from 'src/config';

@InputType()
export class CreateShopDto {
  @ApiProperty({ example: 'Password', description: 'Shop password' })
  @IsOptional()
  @IsString({ message: 'Password should be string' })
  @Matches(VALID_PASSWORD_REGEXP, { message: 'Invalid password' })
  @Field(() => String, { nullable: true })
  readonly password?: string;

  @ApiProperty({ example: 'Wear shop', description: 'Shop name' })
  @IsNotEmpty({ message: 'Title required' })
  @IsString({ message: 'Title should be string' })
  @Field(() => String)
  readonly title: string;

  @ApiProperty({
    example: 'The store with a wide selection',
    description: 'Notification id',
  })
  @IsNotEmpty({ message: 'Description required' })
  @IsString({ message: 'Description should be string' })
  @Field(() => String)
  readonly description: string;

  @ApiProperty({ example: 'logo.png', description: 'Shop logo' })
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly logo?: string;

  @ApiProperty({ example: 1, description: 'Seller ID' })
  @Field(() => Int)
  readonly userId: number;

  @ApiProperty({ example: 'image.png', description: 'Shop wallpaper' })
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly wallpaper?: string;

  @ApiProperty({ example: 89281985678, description: 'Shop telephone number' })
  @IsNotEmpty({ message: 'Telephone number required' })
  @IsPhoneNumber()
  @Field(() => Int)
  readonly telephone: number;

  @ApiProperty({ example: 'shop@gmail.com', description: 'Shop email' })
  @IsNotEmpty({ message: 'Email required' })
  @IsEmail({}, { message: 'Invalid email' })
  @Field(() => String)
  readonly email: string;

  @ApiProperty({ example: 'Kosmonavtov st. 22', description: 'Shop address' })
  @IsString({ message: 'Address should be string' })
  @Field(() => String)
  readonly address: string;

  @ApiProperty({ example: 'russian', description: 'Selected language' })
  @IsString({ message: 'Language should be string' })
  @Field(() => String)
  readonly language: string;

  @ApiProperty({ example: 'russian ruble', description: 'Currency' })
  @IsString({ message: 'Currency should be string' })
  @Field(() => String)
  readonly currency: string;

  @ApiProperty({ example: 'OOO "Store"', description: 'Legal entity name' })
  @IsString({ message: 'Legal entity should be string' })
  @Field(() => String)
  readonly legalEntity: string;

  @ApiProperty({ example: 0, description: 'INN' })
  @Field(() => Int)
  readonly inn: number;

  @ApiProperty({ example: 0, description: 'KPP' })
  @Field(() => Int)
  readonly kpp: number;

  @ApiProperty({ example: 'Kosmonavtov st. 22', description: 'Legal address' })
  @IsString({ message: 'Legal address should be string' })
  @Field(() => String)
  readonly legalAddress: string;

  @ApiProperty({ example: 'Sberbank', description: 'The name of the bank' })
  @IsString({ message: 'Bank name should be string' })
  @Field(() => String)
  readonly bank: string;

  @ApiProperty({ example: 0, description: 'BIK' })
  @Field(() => Int)
  readonly bik: number;

  @ApiProperty({ example: 0, description: 'Checking account' })
  @Field(() => Int)
  readonly checkAccount: number;

  @ApiProperty({ example: 0, description: 'Corp account' })
  @IsOptional()
  @Field(() => Int)
  readonly corpAccount: number;

  @ApiProperty({ example: 'push', description: 'Notification type' })
  @IsOptional()
  @IsString({ message: 'Notification type should be string' })
  @Field(() => String)
  readonly type?: string;

  @ApiProperty({
    example: ['email', 'news'],
    description: 'Allowed notifications list',
  })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly selectedList?: string[];
}
