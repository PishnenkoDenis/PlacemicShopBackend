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

interface CreateCurrencyAttributes {
  currency: string;
  shop_id: number;
}

@ObjectType()
@Table({ tableName: 'currency' })
export class Currency extends Model<Currency, CreateCurrencyAttributes> {
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

  @ApiProperty({ example: 'russian ruble', description: 'Currency' })
  @Field(() => String)
  @Column({
    type: DataType.ENUM({
      values: [
        'russian ruble',
        'american dollar',
        'belorussian ruble',
        'armenian dram',
      ],
    }),
    allowNull: false,
    field: 'currency',
  })
  currency: string;

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
