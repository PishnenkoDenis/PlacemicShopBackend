import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';

import { FooResolver } from './app.controllers';
import { BasketModule } from './basket/basket.module';
import { Basket } from './models/basket.model';
import { BrowsingHistory } from './models/browsinghistory.model';
import { Category } from './models/category.model';
import { Comment } from './models/comment.model';
import { DeliveryAddress } from './models/deliveryaddress.model';
import { FavoritesProduct } from './models/favoritesproduct.model';
import { FavoritesShop } from './models/favoritesshop.model';
import { Order } from './models/order.model';
import { OrderProduct } from './models/orderproduct.model';
import { Password } from './models/password.model';
import { Payment } from './models/payment.model';
import { Product } from './models/product.model';
import { ProductImage } from './models/productimage.model';
import { PurchaseHistory } from './models/purchasehistory.model';
import { Shop } from './models/shop.model';
import { SpecificationProduct } from './models/specificationproduct.model';
import { SubCategory } from './models/subcategory.model';
import { Token } from './models/token.model';
import { User } from './models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_USER_PASSWORD,
      database: process.env.DB_NAME,
      models: [
        User,
        Basket,
        BrowsingHistory,
        Category,
        Comment,
        DeliveryAddress,
        FavoritesProduct,
        FavoritesShop,
        Order,
        OrderProduct,
        Password,
        Payment,
        Product,
        ProductImage,
        PurchaseHistory,
        Shop,
        SpecificationProduct,
        SubCategory,
        Token,
      ],
      autoLoadModels: true,
    }),
    BasketModule,
  ],
  controllers: [],
  providers: [FooResolver],
})
export class AppModule {}
