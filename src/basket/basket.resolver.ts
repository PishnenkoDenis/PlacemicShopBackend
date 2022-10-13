import { Args, Int, Query, Resolver } from '@nestjs/graphql';

import { Basket } from './basket.model';
import { BasketService } from './basket.service';

@Resolver(() => Basket)
export class BasketResolver {
  constructor(private readonly basketService: BasketService) {}

  @Query(() => [Basket], { name: 'basket' })
  async getBasketData(@Args('id', { type: () => Int }) id: number) {
    return await this.basketService.getBasketData(id);
  }
}
