import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

@InputType()
export class CreateShopDto {
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

  @ApiProperty({ example: 1, description: 'Novelties ID' })
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly noveltiesId?: number;

  @ApiProperty({ example: 1, description: 'Sale ID' })
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly saleId?: number;

  @ApiProperty({ example: 1, description: 'Seller ID' })
  @Field(() => Int)
  readonly user_id: number;

  @ApiProperty({ example: 'image.png', description: 'Shop wallpaper' })
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly wallpaper?: string;

  @ApiProperty({ example: 89281985678, description: 'Shop telephone number' })
  @IsNotEmpty({ message: 'Telephone number required' })
  @IsPhoneNumber()
  @Field(() => Int)
  readonly telphone: number;

  @ApiProperty({ example: 'shop@gmail.com', description: 'Shop email' })
  @IsNotEmpty({ message: 'Email required' })
  @IsEmail({}, { message: 'Invalid email' })
  @Field(() => String)
  readonly email: string;

  @ApiProperty({ example: 'Kosmonavtov st. 22', description: 'Shop address' })
  @IsString({ message: 'Address should be string' })
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly address?: string;

  @ApiProperty({ example: 'OOO "Store"', description: 'Legal entity name' })
  @IsString({ message: 'Legal entity should be string' })
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly legalEntity?: string;

  @ApiProperty({ example: 0, description: 'INN' })
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly inn?: number;

  @ApiProperty({ example: 0, description: 'KPP' })
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly kpp?: number;

  @ApiProperty({ example: 'Kosmonavtov st. 22', description: 'Legal address' })
  @IsString({ message: 'Legal address should be string' })
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly legal_address?: string;

  @ApiProperty({ example: 'Sberbank', description: 'The name of the bank' })
  @IsString({ message: 'Bank name should be string' })
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly bank?: string;

  @ApiProperty({ example: 0, description: 'BIK' })
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly bik?: number;

  @ApiProperty({ example: 0, description: 'Checking account' })
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly check_account?: number;

  @ApiProperty({ example: 0, description: 'Corp account' })
  @IsOptional()
  @Field(() => Int, { nullable: true })
  readonly corp_account?: number;

  @ApiProperty({ example: 'push', description: 'Notification type' })
  @IsOptional()
  @IsString({ message: 'Notification type should be string' })
  @Field(() => String, { nullable: true })
  readonly type?: string;

  @ApiProperty({ example: true, description: 'Allow order notifications' })
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  readonly orders?: boolean;

  @ApiProperty({ example: true, description: 'Allow messages notifications' })
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  readonly messages?: boolean;

  @ApiProperty({ example: true, description: 'Allow news notifications' })
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  readonly news?: boolean;
}
