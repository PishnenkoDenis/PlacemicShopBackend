import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Basket } from './basket.model';
import { BasketService } from './basket.service';
import { CreateBasketInput } from './dto/create-basket.input';

@Resolver(() => Basket)
export class BasketResolver {
  constructor(private readonly basketService: BasketService) {}

  @Query(() => [Basket], { name: 'basket' })
  async getBasketData(@Args('id', { type: () => Int }) id: number) {
    return await this.basketService.getBasketData(id);
  }

  @Mutation(() => Basket)
  async addingToBasket(@Args('addItem') addItem: CreateBasketInput) {
    return await this.basketService.addingToBasket(addItem);
  }

  @Mutation(() => Basket)
  async removeFromBasket(@Args('id') id: number): Promise<object> {
    await this.basketService.removeFromTrash(id);
    return { id };
  }
}
