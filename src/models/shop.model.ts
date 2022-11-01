import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

import { Category } from './category.model';
import { Comment } from './comment.model';
import { FavoritesShop } from './favorites-shop.model';
import { Product } from './product.model';
import { User } from '../users/user.model';

interface ShopCreateAttributes {
  title: string;
  description: string;
  logo: string;
  noveltiesId?: number;
  saleId?: number;
  user_id: number;
}

@Table({ tableName: 'shop' })
export class Shop extends Model<Shop, ShopCreateAttributes> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'title',
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'description',
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'logo',
  })
  logo: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comment: Comment[];

  @HasMany(() => Category)
  category: Category[];

  @HasMany(() => FavoritesShop)
  favoritesShop: FavoritesShop[];

  @HasMany(() => Product)
  product: Product[];
}
