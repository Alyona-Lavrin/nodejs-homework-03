import listen from './app.js';
import { set, connect } from 'mongoose';

const { DB_HOST } = process.env;

set('strictQuery', true);

connect(DB_HOST)
  .then(() => {
    listen(3000, () => {
      console.log('Database connection successful');
    });
  })
  .catch(error => {
    console.log(error.messege);
    process.exit(1);
  });