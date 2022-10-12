import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../models/product.model';
import { Basket } from './basket.model';

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
