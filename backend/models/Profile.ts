import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Profile extends Model<Profile> {
  @PrimaryKey
  @Column
  public profileId!: string;

  @Column
  public avatar!: string;

  @Column
  public name!: string;

  @Column
  public hobbies: string;

  @Column
  public role: string;

  @Column
  public bio: string;
}
