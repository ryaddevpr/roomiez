import { config } from 'dotenv'; // Load .env file before accessing process.env
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

config();
export const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL, // Now this will have the correct value
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
