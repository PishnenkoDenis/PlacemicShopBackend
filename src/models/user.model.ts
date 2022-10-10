import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Table,
  Model,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { Token } from './token.model';
import { Shop } from './shop.model';
import { Basket } from './basket.model';
import { BrowsingHistory } from './browsinghistory.model';
import { DeliveryAddress } from './deliveryaddress.model';
import { FavoritesProduct } from './favoritesproduct.model';
import { FavoritesShop } from './favoritesshop.model';
import { Password } from './password.model';
import { PurchaseHistory } from './purchasehistory.model';
import { Order } from './order.model';
import { Comment } from './comment.model';

interface UserCreationAttributes {
  fullName: string;
  email: string;
  birthday: string;
  phone?: string;
  avatar?: string;
  role?: string;
  address?: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Uniq id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Ivan Ivanov', description: 'User full name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    field: 'full_name',
  })
  fullName: string;

  @ApiProperty({ example: 'ivan.ivanov@gmail.com', description: 'User email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
    unique: true,
    field: 'email',
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: 'birthday',
  })
  birthday: string;

  @ApiProperty({
    example: '+1 999 88-77-666',
    description: 'User phone number',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'phone',
  })
  phone: string;

  @ApiProperty({ description: 'User avatar' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'avatar',
  })
  avatar: string;

  @ApiProperty({ example: 'buyer', description: 'User role' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'role',
  })
  role: string;

  @ApiProperty({
    example: 'Rostovskaya oblast,Taganrog gorod, Krasnaya ulitsa, 1 dom',
    description: 'User address',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'address',
  })
  address: string;

  @HasOne(() => Password)
  password: Password;

  @HasOne(() => Token)
  refresh: Token;

  @HasMany(() => BrowsingHistory)
  browsingHistory: BrowsingHistory[];

  @HasMany(() => DeliveryAddress)
  deliveryAddress: DeliveryAddress[];

  @HasMany(() => PurchaseHistory)
  purchaseHistory: PurchaseHistory[];

  @HasMany(() => Comment)
  comment: Comment[];

  @HasMany(() => FavoritesProduct)
  favoritesProduct: FavoritesProduct[];

  @HasMany(() => FavoritesShop)
  favoritesShop: FavoritesShop[];

  @HasMany(() => Shop)
  shop: Shop[];

  @HasMany(() => Order)
  order: Order[];

  @HasMany(() => Basket)
  basket: Basket[];
}
