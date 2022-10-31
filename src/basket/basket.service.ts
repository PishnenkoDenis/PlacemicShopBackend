import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { Product } from '../models/product.model';
import { Basket } from './basket.model';
import { CreateBasketInput } from './dto/create-basket.input';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket)
    private basketRepository: typeof Basket,
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  async getBasketData(id: number) {
    const result = await this.basketRepository.findAll({
      where: { userId: id },
      include: [
        {
          model: this.productRepository,
        },
      ],
    });
    if (!result?.length) {
      throw new NotFoundException();
    }
    return result;
  }

  async addingToBasket(addItem: CreateBasketInput) {
    const availability = await this.basketRepository.findAll({
      where: {
        [Op.and]: { userId: addItem.userId, productId: addItem.productId },
      },
    });
    if (availability?.length) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Item already added',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.basketRepository.create(addItem);
  }

  async removeFromTrash(itemId: number) {
    const availability = await this.basketRepository.findOne({
      where: {
        id: itemId,
      },
    });
    if (!availability) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Item already added',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    await this.basketRepository.destroy({
      where: {
        id: itemId,
      },
    });
  }
}
