import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Shop } from 'src/models/shop.model';

import { CreateShopDto } from './dto/create-shop.dto';
import { ShopService } from './shop.service';

@Resolver()
export class ShopResolver {
  constructor(private shopService: ShopService) {}

//   @Mutation(() => Shop)
// //   async createShop(@Args('dto') dto: CreateShopDto): Promise<> {}

//   @Mutation(() => Shop)
//   async updateShop() {}

//   @Mutation(() => Shop)
//   async removeShop() {}
}
