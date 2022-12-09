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
  type?: string;
  orders?: boolean;
  messages?: boolean;
  news?: boolean;
  shopId: number;
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

  @ApiProperty({ example: 'push', description: 'Notification type' })
  @Field(() => String, { nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'type',
  })
  type?: string;

  @ApiProperty({ example: true, description: 'Allow order notifications' })
  @Field(() => Boolean, { nullable: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'orders',
  })
  orders?: boolean;

  @ApiProperty({ example: true, description: 'Allow messages notifications' })
  @Field(() => Boolean, { nullable: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'messages',
  })
  messages?: boolean;

  @ApiProperty({ example: true, description: 'Allow news notifications' })
  @Field(() => Boolean, { nullable: true })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'news',
  })
  news?: boolean;

  @ApiProperty({ example: 1, description: 'Shop ID' })
  @Field(() => Int)
  @ForeignKey(() => Shop)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'shop_id',
  })
  shopId: number;

  @BelongsTo(() => Shop)
  shop: Shop;
}
