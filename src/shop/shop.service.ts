import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Currency } from 'src/models/currency.model';
import { Languages } from 'src/models/languages.model';
import { Notifications } from 'src/models/notifications.model';
import { Shop } from 'src/models/shop.model';
import { UsersService } from 'src/users/users.service';

import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel(Shop) private shopRepository: typeof Shop,
    @InjectModel(Languages) private languagesRepository: typeof Languages,
    @InjectModel(Currency) private currencyRepository: typeof Currency,
    @InjectModel(Notifications)
    private notificationsRepository: typeof Notifications,
    private usersService: UsersService,
  ) {}

  async create({
    title,
    description,
    logo,
    wallpaper,
    telephone,
    email,
    address,
    legalEntity,
    inn,
    kpp,
    legalAddress,
    bank,
    bik,
    checkAccount,
    corpAccount,
    userId,
    language,
    currency,
    notifyEmail,
    notifyPush,
    notifyTelephone,
    password,
  }: CreateShopDto): Promise<Shop> {
    const shop = await this.shopRepository.create({
      title,
      description,
      logo,
      wallpaper,
      telephone,
      email,
      address,
      legal_entity: legalEntity,
      inn,
      kpp,
      legal_address: legalAddress,
      bank,
      bik,
      check_account: checkAccount,
      corp_account: corpAccount,
      user_id: userId,
    });

    if (password) {
      await this.usersService.createPassword({ userId, password });
    }

    await this.languagesRepository.create({
      language,
      shop_id: shop.id,
    });

    await this.currencyRepository.create({
      currency,
      shop_id: shop.id,
    });

    await this.notificationsRepository.create({
      email: notifyEmail,
      push: notifyPush,
      telephone: notifyTelephone,
      shop_id: shop.id,
    });

    return shop;
  }

  async update(
    shopId: number,
    {
      title,
      description,
      logo,
      wallpaper,
      telephone,
      email,
      address,
      legalEntity,
      inn,
      kpp,
      legalAddress,
      bank,
      bik,
      checkAccount,
      corpAccount,
      userId,
      language,
      currency,
      notifyEmail,
      notifyPush,
      notifyTelephone,
      password,
    }: CreateShopDto,
  ) {
    const shop = await this.shopRepository.findOne({
      attributes: [
        'id',
        'title',
        'description',
        'logo',
        'wallpaper',
        'telephone',
        'email',
        'address',
        'legal_entity',
        'inn',
        'kpp',
        'legal_address',
        'bank',
        'bik',
        'check_account',
        'corp_account',
      ],
      where: { id: shopId },
      include: { all: true },
    });

    if (language) await shop.language.update({ language });

    if (currency) await shop.currency.update({ currency });

    if (notifyEmail) await shop.notifications.update({ email: notifyEmail });

    if (notifyPush) await shop.notifications.update({ push: notifyPush });

    if (notifyTelephone)
      await shop.notifications.update({ telephone: notifyTelephone });

    if (password) await this.usersService.updatePassword({ userId, password });

    return await shop.update({
      title,
      description,
      logo,
      wallpaper,
      telephone,
      email,
      address,
      legal_entity: legalEntity,
      inn,
      kpp,
      legal_address: legalAddress,
      bank,
      bik,
      check_account: checkAccount,
      corp_account: corpAccount,
    });
  }

  async remove(shopId: number) {
    await this.shopRepository.destroy({ where: { id: shopId } });
  }

  async get(userId: number): Promise<Shop> {
    return await this.shopRepository.findOne({
      attributes: [
        'id',
        'title',
        'description',
        'logo',
        'wallpaper',
        'telephone',
        'email',
        'address',
        'legal_entity',
        'inn',
        'kpp',
        'legal_address',
        'bank',
        'bik',
        'check_account',
        'corp_account',
      ],
      where: { user_id: userId },
      include: { all: true },
    });
  }
}
