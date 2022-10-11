import { Injectable, NotFoundException } from '@nestjs/common';
import { Basket } from '../models/basket.model';
import { Product } from '../models/product.model';

@Injectable()
export class BasketService {
  async findOne(id: number) {
    const result = await Basket.findAll({
      where: { userId: id },
      include: [
        {
          model: Product,
        },
      ],
    });
    if (result.length === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
