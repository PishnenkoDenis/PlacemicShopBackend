import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';
import * as BigInt from 'graphql-bigint';
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
  @Field(() => BigInt)
  readonly telephone: bigint;

  @ApiProperty({ example: 'shop@gmail.com', description: 'Shop email' })
  @IsNotEmpty({ message: 'Email required' })
  @IsEmail({}, { message: 'Invalid email' })
  @Field(() => String)
  readonly email: string;

  @ApiProperty({ example: 'Kosmonavtov st. 22', description: 'Shop address' })
  @IsNotEmpty({ message: 'Address required' })
  @IsString({ message: 'Address should be string' })
  @Field(() => String)
  readonly address: string;

  @ApiProperty({ example: 'russian', description: 'Selected language' })
  @IsNotEmpty({ message: 'Language required' })
  @IsString({ message: 'Language should be string' })
  @Field(() => String)
  readonly language: string;

  @ApiProperty({ example: 'russian ruble', description: 'Currency' })
  @IsNotEmpty({ message: 'Currency required' })
  @IsString({ message: 'Currency should be string' })
  @Field(() => String)
  readonly currency: string;

  @ApiProperty({ example: 'OOO "Store"', description: 'Legal entity name' })
  @IsNotEmpty({ message: 'Legal Entity required' })
  @IsString({ message: 'Legal entity should be string' })
  @Field(() => String)
  readonly legalEntity: string;

  @ApiProperty({ example: 2202022422, description: 'INN' })
  @IsNotEmpty({ message: 'INN required' })
  @Min(10)
  @Field(() => BigInt)
  readonly inn: bigint;

  @ApiProperty({ example: 220202242, description: 'KPP' })
  @IsNotEmpty({ message: 'KPP required' })
  @Min(9)
  @Field(() => BigInt)
  readonly kpp: bigint;

  @ApiProperty({ example: 'Kosmonavtov st. 22', description: 'Legal address' })
  @IsNotEmpty({ message: 'Legal address required' })
  @IsString({ message: 'Legal address should be string' })
  @Field(() => String)
  readonly legalAddress: string;

  @ApiProperty({ example: 'Sberbank', description: 'The name of the bank' })
  @IsNotEmpty({ message: 'Bank required' })
  @IsString({ message: 'Bank name should be string' })
  @Field(() => String)
  readonly bank: string;

  @ApiProperty({ example: 220202242, description: 'BIK' })
  @IsNotEmpty({ message: 'BIK required' })
  @Min(9)
  @Field(() => BigInt)
  readonly bik: bigint;

  @ApiProperty({
    example: '22134256789123445436',
    description: 'Checking account',
  })
  @IsNotEmpty({ message: 'Checking account required' })
  @MinLength(20)
  @Field(() => String)
  readonly checkAccount: string;

  @ApiProperty({ example: '22134256789123445436', description: 'Corp account' })
  @IsNotEmpty({ message: 'Corp account required' })
  @MinLength(20)
  @Field(() => String)
  readonly corpAccount: string;

  @ApiProperty({ example: ['push', 'email'], description: 'Notification type' })
  @IsOptional()
  @IsString({ message: 'Notification type should be string' })
  @Field(() => [String], { nullable: true })
  readonly type?: string[];

  @ApiProperty({
    example: ['email', 'news'],
    description: 'Allowed notifications list',
  })
  @IsOptional()
  @Field(() => [String], { nullable: true })
  readonly selectedList?: string[];
}
