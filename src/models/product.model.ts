import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';

import { Basket } from './basket.model';
import { BrowsingHistory } from './browsinghistory.model';
import { Comment } from './comment.model';
import { FavoritesProduct } from './favoritesproduct.model';
import { Order } from './order.model';
import { OrderProduct } from './orderproduct.model';
import { ProductImage } from './productimage.model';
import { Shop } from './shop.model';
import { SpecificationProduct } from './specificationproduct.model';
import { SubCategory } from './subcategory.model';

interface ProductCreateAttributes {
  title: string;
  description: string;
  prise: number;
  rating: number;
  isDelete: boolean;
  shopId: number;
  orderId: number;
  subCategoryId: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductCreateAttributes> {
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
    type: DataType.INTEGER,
    allowNull: false,
    field: 'prise',
  })
  prise: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_delete',
  })
  isDelete: number;

  @ForeignKey(() => Shop)
  @Column({
    type: DataType.INTEGER,
    field: 'shop_id',
  })
  shopId: number;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    field: 'order_id',
  })
  orderId: number;

  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.INTEGER,
    field: 'sub_category_id',
  })
  subCategoryId: number;

  @HasOne(() => SpecificationProduct)
  specificationProduct: SpecificationProduct;

  @HasMany(() => Comment)
  comment: Comment[];

  @HasMany(() => ProductImage)
  productImage: ProductImage[];

  @HasMany(() => BrowsingHistory)
  browsingHistory: BrowsingHistory[];

  @HasMany(() => FavoritesProduct)
  favoritesProduct: FavoritesProduct[];

  @HasMany(() => OrderProduct)
  orderProduct: OrderProduct[];

  @HasMany(() => Basket)
  basket: Basket[];
}
