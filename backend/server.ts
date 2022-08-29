import express from 'express';
import { sequelize } from './sequelize';
import { UserRouter } from './routes/userRoutes';
import { ProfileRouter } from './routes/profileRoutes';
import { PostRouter } from './routes/postRoutes';

console.debug('Initialize database connection...');
sequelize.sync();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', UserRouter);

app.use('/api/profiles', ProfileRouter);

app.use('/api/posts', PostRouter);
export default app;
