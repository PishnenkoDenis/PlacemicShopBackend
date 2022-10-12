import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { Product } from './product.model';
import { User } from './user.model';

interface FavoritesProductCreateAttributes {
  productId: number;
  userId: number;
}

@Table({ tableName: 'favorites_product' })
export class FavoritesProduct extends Model<
  FavoritesProduct,
  FavoritesProductCreateAttributes
> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    field: 'product_id',
  })
  productId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => User)
  user: User;
}
