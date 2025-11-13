import { Sequelize } from 'sequelize';
import pg from 'pg';
import config from '.';
export const sequelize = new Sequelize(config.database_url, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  // eslint-disable-next-line no-console
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});
