import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database_url: process.env.DATABASE_URL as string,
  salt_rounds: process.env.SALT_ROUNDS,
  jwt_secret: process.env.JWT_SECRET as string,
  jwt_expires_in: process.env.JWT_EXPIRES_IN || '7d',
};
