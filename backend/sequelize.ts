import { Sequelize } from 'sequelize-typescript';
import { User } from './models/User';
import { Post } from './models/Post';
import { Profile } from './models/Profile';

export const sequelize = new Sequelize({
  username: process.env.POSTGRES_USERNAME || 'localuser',
  password: process.env.POSTGRES_PASSWORD || 'testpassword',
  database: process.env.POSTGRES_DB || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: 5432,
  dialect: 'postgres',
  storage: ':memory:',
  models: [User, Post, Profile], // or [Player, Team],
});
