import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';

import { Basket } from '../basket/basket.model';
import { FavoritesProduct } from '../favorites-product/favorites-product.model';
import { BrowsingHistory } from './browsing-history.model';
import { Comment } from './comment.model';
import { Order } from './order.model';
import { OrderProduct } from './order-product.model';
import { ProductImage } from './product-image.model';
import { Shop } from './shop.model';
import { SpecificationProduct } from './specification-product.model';
import { SubCategory } from './sub-category.model';

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

@ObjectType()
@Table({ tableName: 'product' })
export class Product extends Model<Product, ProductCreateAttributes> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'title',
  })
  title: string;

  @Field()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    field: 'description',
  })
  description: string;

  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'prise',
  })
  prise: number;

  @Field(() => Int)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_delete',
  })
  isDelete: number;

  @Field(() => Int)
  @ForeignKey(() => Shop)
  @Column({
    type: DataType.INTEGER,
    field: 'shop_id',
  })
  shopId: number;

  @Field(() => Int)
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    field: 'order_id',
  })
  orderId: number;

  @Field(() => Int)
  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.INTEGER,
    field: 'sub_category_id',
  })
  subCategoryId: number;

  @HasMany(() => Basket)
  Basket: Basket;

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
}
