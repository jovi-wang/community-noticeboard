import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({ timestamps: false })
export class User extends Model<User> {
  @PrimaryKey
  @Column
  public email!: string;

  @Column
  public passwordHash!: string;

  @Column
  public profileId!: string;
}
