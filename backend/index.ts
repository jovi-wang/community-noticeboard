import dotenv from 'dotenv';
dotenv.config();
import app from './server';

const port = 5000;
app.listen(port, () => {
  console.log(`Backend api started on port: ${port}`);
});
