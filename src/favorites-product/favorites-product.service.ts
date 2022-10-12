import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';

import { FavoritesProduct } from './favorites-product.model';

@Injectable()
export class FavoritesProductService {
  async findOne(id: number) {
    const result = await FavoritesProduct.findAll({
      where: { userId: id },
      include: [{ model: Product }, { model: User }],
    });
    console.log(result);
    if (result.length === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
