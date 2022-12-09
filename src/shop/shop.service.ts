import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shop } from 'src/models/shop.model';

@Injectable()
export class ShopService {
  constructor(@InjectModel(Shop) private shopRepository: typeof Shop) {}

  async create() {}

  async update() {}

  async remove() {}
}
