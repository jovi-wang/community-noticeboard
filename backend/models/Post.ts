import { Table, Column, Model, PrimaryKey } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Post extends Model<Post> {
  @PrimaryKey
  @Column
  public postId!: string;

  @Column
  public profileId!: string;

  @Column
  public date!: string;

  @Column
  public text!: string;
}
