import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { BasketService } from './basket.service';
import { Basket } from '../models/basket.model';

@Resolver(() => Basket)
export class BasketResolver {
  constructor(private readonly basketService: BasketService) {}

  @Query(() => [Basket], { name: 'basket' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.basketService.findOne(id);
  }
}
