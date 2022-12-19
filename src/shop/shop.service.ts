import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { Currency } from 'src/models/currency.model';
import { Filename } from 'src/models/filename.model';
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
    private fileUploadService: FileUploadService,
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
    newPassword,
    oldPassword,
  }: CreateShopDto): Promise<Shop> {
    const shop = this.shopRepository.build({
      title,
      description,
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

    if (logo)
      shop.logo = (await this.fileUploadService.createFile(logo)).filename;

    if (wallpaper)
      shop.wallpaper = (
        await this.fileUploadService.createFile(wallpaper)
      ).filename;

    if (newPassword && oldPassword) {
      await this.usersService.updatePassword(oldPassword, newPassword, userId);
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

    return await shop.save();
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
      newPassword,
      oldPassword,
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

    let logoName: Filename;
    let wallpaperName: Filename;

    if (language) await shop.language.update({ language });

    if (currency) await shop.currency.update({ currency });

    await shop.notifications.update({
      email: notifyEmail,
      push: notifyPush,
      telephone: notifyTelephone,
    });

    if (newPassword && oldPassword) {
      await this.usersService.updatePassword(oldPassword, newPassword, userId);
    }

    if (logo) {
      logoName = await this.fileUploadService.createFile(logo);
    }

    if (wallpaper) {
      wallpaperName = await this.fileUploadService.createFile(wallpaper);
    }

    return await shop.update({
      title,
      description,
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
      logo: logoName.filename,
      wallpaper: wallpaperName.filename,
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
