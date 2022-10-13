import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/models/product.model';
import { User } from 'src/models/user.model';

import { FavoritesProduct } from './favorites-product.model';

@Injectable()
export class FavoritesProductService {
  constructor(
    @InjectModel(Product)
    private productRepository: typeof Product,
    @InjectModel(User)
    private userRepository: typeof User,
    @InjectModel(FavoritesProduct)
    private favoritesProduct: typeof FavoritesProduct,
  ) {}
  async findOne(id: number) {
    const result = await this.favoritesProduct.findAll({
      where: { userId: id },
      include: [
        { model: this.productRepository },
        { model: this.userRepository },
      ],
    });
    if (result.length === 0) {
      throw new NotFoundException();
    }
    return result;
  }
}
