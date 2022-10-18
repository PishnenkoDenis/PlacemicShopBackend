import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from 'src/models/product.model';

import { Basket } from './basket.model';
import { BasketResolver } from './basket.resolver';
import { BasketService } from './basket.service';

@Module({
  imports: [SequelizeModule.forFeature([Basket, Product])],
  providers: [BasketResolver, BasketService],
})
export class BasketModule {}
