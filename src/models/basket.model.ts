import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Product } from './product.model';
import { User } from './user.model';

interface BasketCreateAttributes {
  userId: number;
  productId: number;
}

@ObjectType()
@Table({ tableName: 'basket' })
export class Basket extends Model<Basket, BasketCreateAttributes> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Field(() => Int)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @Field(() => Int)
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'product_id',
  })
  productId: number;

  @BelongsTo(() => User)
  user: User;

  @Field(() => Product)
  @BelongsTo(() => Product)
  product: Product;
}
