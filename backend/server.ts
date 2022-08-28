import dotenv from 'dotenv';
import express from 'express';
import { sequelize } from './sequelize';
import { UserRouter } from './routes/userRoutes';
import { ProfileRouter } from './routes/profileRoutes';
import { hashPassword } from './helper';
import { PostRouter } from './routes/postRoutes';
dotenv.config();
const port = process.env.PORT || 5000;

(async () => {
  console.debug('Initialize database connection...');
  await sequelize.sync();
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // app.get('/', async (req, res) => {
  //   console.log(await hashPassword('passwordannie'));
  //   console.log(await hashPassword('passwordlisa'));
  //   console.log(await hashPassword('passwordarthur'));
  //   console.log(await hashPassword('passwordhoward'));
  //   res.send();
  // });

  app.use('/api/users', UserRouter);

  app.use('/api/profiles', ProfileRouter);

  app.use('/api/posts', PostRouter);

  app.listen(port, () => console.log(`Server started on port ${port}`));
})();
