import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Product } from '../models/product.model';
import { Basket } from './basket.model';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket)
    private basketRepository: typeof Basket,
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  async findOne(id: number) {
    const result = await this.basketRepository.findAll({
      where: { userId: id },
      include: [
        {
          model: this.productRepository,
        },
      ],
    });
    if (result.length === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
