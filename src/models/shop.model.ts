import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/product/product.model';

import { User } from '../users/user.model';
import { Category } from './category.model';
import { Comment } from './comment.model';
import { Currency } from './currency.model';
import { FavoritesShop } from './favorites-shop.model';
import { Languages } from './languages.model';
import { Notifications } from './notifications.model';

interface ShopCreateAttributes {
  title: string;
  description: string;
  logo?: string;
  user_id: number;
  wallpaper?: string;
  telephone: number;
  email: string;
  address: string;
  legal_entity: string;
  inn: number;
  kpp: number;
  legal_address: string;
  bank: string;
  bik: number;
  check_account: number;
  corp_account: number;
}

@ObjectType()
@Table({ tableName: 'shop' })
export class Shop extends Model<Shop, ShopCreateAttributes> {
  @ApiProperty({ example: 1, description: 'Shop id' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Wear shop', description: 'Shop name' })
  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'title',
  })
  title: string;

  @ApiProperty({
    example: 'The store with a wide selection',
    description: 'Notification id',
  })
  @Field(() => String)
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'description',
  })
  description: string;

  @ApiProperty({ example: 'logo.png', description: 'Shop logo' })
  @Field(() => String, { nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'logo',
  })
  logo?: string;

  @ApiProperty({ example: 'image.png', description: 'Shop wallpaper' })
  @Field(() => String, { nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'wallpaper',
  })
  wallpaper?: string;

  @ApiProperty({ example: 89281985678, description: 'Shop telephone number' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'telephone',
  })
  telephone: number;

  @ApiProperty({ example: 'shop@gmail.com', description: 'Shop email' })
  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'email',
  })
  email: string;

  @ApiProperty({ example: 'Kosmonavtov st. 22', description: 'Shop address' })
  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'address',
  })
  address: string;

  @ApiProperty({ example: 'OOO "Store"', description: 'Legal entity name' })
  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'legal_entity',
  })
  legal_entity: string;

  @ApiProperty({ example: 0, description: 'INN' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'inn',
  })
  inn: number;

  @ApiProperty({ example: 0, description: 'KPP' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'kpp',
  })
  kpp: number;

  @ApiProperty({ example: 'Kosmonavtov st. 22', description: 'Legal address' })
  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'legal_address',
  })
  legal_address: string;

  @ApiProperty({ example: 'Sberbank', description: 'The name of the bank' })
  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'bank',
  })
  bank: string;

  @ApiProperty({ example: 0, description: 'BIK' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'bik',
  })
  bik: number;

  @ApiProperty({
    example: 0,
    description: 'Checking account',
  })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'check_account',
  })
  check_account: number;

  @ApiProperty({ example: 0, description: 'Corp account' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'corp_account',
  })
  corp_account: number;

  @ApiProperty({ example: 1, description: 'Seller ID' })
  @Field(() => Int)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Notifications)
  notifications: Notifications[];

  @HasOne(() => Languages)
  language: Languages;

  @HasOne(() => Currency)
  currency: Currency;

  @HasMany(() => Comment)
  comment: Comment[];

  @HasMany(() => Category)
  category: Category[];

  @HasMany(() => FavoritesShop)
  favoritesShop: FavoritesShop[];

  @HasMany(() => Product)
  product: Product[];
}
