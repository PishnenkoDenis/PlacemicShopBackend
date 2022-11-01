import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from './user.model';

interface TokenCreateAttributes {
  expiresIn: string;
  refresh: string;
  userId: number;
}

@Table({ tableName: 'token' })
export class Token extends Model<Token, TokenCreateAttributes> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'expires_in',
  })
  expiresIn: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'refresh',
  })
  refresh: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
