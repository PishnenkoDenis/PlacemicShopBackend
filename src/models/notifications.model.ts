import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Shop } from './shop.model';

interface NotificationCreateAttributes {
  email?: string[];
  push?: string[];
  telephone?: string[];
  shop_id: number;
}

@ObjectType()
@Table({ tableName: 'notifications' })
export class Notifications extends Model<
  Notifications,
  NotificationCreateAttributes
> {
  @ApiProperty({ example: 1, description: 'Notification id' })
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: ['orders', 'news'],
    description: 'Notifications by email',
  })
  @Field(() => [String], { nullable: true })
  @Column({
    type: DataType.ARRAY(
      DataType.ENUM({ values: ['orders', 'messages', 'news'] }),
    ),
    allowNull: true,
    field: 'email',
  })
  email?: string[];

  @ApiProperty({
    example: ['orders', 'news'],
    description: 'Push notifications',
  })
  @Field(() => [String], { nullable: true })
  @Column({
    type: DataType.ARRAY(
      DataType.ENUM({
        values: ['orders', 'messages', 'news'],
      }),
    ),
    allowNull: true,
    field: 'push',
  })
  push?: string[];

  @ApiProperty({
    example: ['orders', 'news'],
    description: 'Notifications by telephone',
  })
  @Field(() => [String], { nullable: true })
  @Column({
    type: DataType.ARRAY(
      DataType.ENUM({ values: ['orders', 'messages', 'news'] }),
    ),
    allowNull: true,
    field: 'telephone',
  })
  telephone?: string[];

  @ApiProperty({ example: 1, description: 'Shop ID' })
  @Field(() => Int)
  @ForeignKey(() => Shop)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'shop_id',
  })
  shop_id: number;

  @BelongsTo(() => Shop)
  shop: Shop;
}
