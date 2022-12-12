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
  selected_list?: string[];
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

  @ApiProperty({ example: 'push', description: 'Notification type' })
  @Field(() => String, { nullable: true })
  @Column({
    type: DataType.ENUM({ values: ['email', 'push', 'telephone'] }),
    allowNull: true,
    field: 'type',
  })
  type?: string;

  @ApiProperty({
    example: ['orders', 'news'],
    description: 'Allowed notifications list',
  })
  @Field(() => [String], { nullable: true })
  @Column({
    type: DataType.ARRAY(
      DataType.ENUM({
        values: ['orders', 'messages', 'news'],
      }),
    ),
    allowNull: true,
    field: 'selected_list',
  })
  selected_list?: string[];

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
