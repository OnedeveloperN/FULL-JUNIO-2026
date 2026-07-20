const dotenv = require('dotenv');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

const envFile = `.env.${env}`;
dotenv.config({ path: path.resolve(__dirname, envFile) });

module.exports = {
  env,
  port: process.env.PORT || 3000,
  dbName: process.env.DB_NAME,
};