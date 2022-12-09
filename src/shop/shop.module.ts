import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shop } from 'src/models/shop.model';

import { ShopResolver } from './shop.resolver';
import { ShopService } from './shop.service';

@Module({
  imports: [SequelizeModule.forFeature([Shop])],
  providers: [ShopService, ShopResolver],
})
export class ShopModule {}
