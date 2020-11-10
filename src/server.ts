import dotenv from 'dotenv';
import App from './app';

async function start() {
  dotenv.config();
  require('./database/models/index');

  const app = new App();

  app.start();
}

start();
