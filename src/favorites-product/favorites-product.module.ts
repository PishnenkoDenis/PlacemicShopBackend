import { Module } from '@nestjs/common';
import { FavoritesProductService } from './favorites-product.service';
import { FavoritesProductResolver } from './favorites-product.resolver';

@Module({
  providers: [FavoritesProductResolver, FavoritesProductService]
})
export class FavoritesProductModule {}
