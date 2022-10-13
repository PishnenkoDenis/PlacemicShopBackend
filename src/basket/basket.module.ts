import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Basket } from 'src/models/basket.model';
import { Product } from 'src/models/product.model';

import { BasketResolver } from './basket.resolver';
import { BasketService } from './basket.service';

@Module({
  imports: [SequelizeModule.forFeature([Basket, Product])],
  providers: [BasketResolver, BasketService],
})
export class BasketModule {}
