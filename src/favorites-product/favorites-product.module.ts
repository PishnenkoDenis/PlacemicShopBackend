import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { FavoritesProduct } from './favorites-product.model';
import { FavoritesProductResolver } from './favorites-product.resolver';
import { FavoritesProductService } from './favorites-product.service';

@Module({
  imports: [SequelizeModule.forFeature([FavoritesProduct, User, Product])],
  providers: [FavoritesProductResolver, FavoritesProductService],
})
export class FavoritesProductModule {}
