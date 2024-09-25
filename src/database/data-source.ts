import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
const currentEnv = process.env.NODE_ENV || 'local';

console.info('Current Environment: ' + currentEnv);
dotenv.config({ path: path.resolve(process.cwd(), 'env', `.env.${currentEnv}`) });

export const dataSourceOptions = {
    type: process.env.DATABASE_TYPE,
    port: Number(process.env.DATABASE_PORT),
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    synchronize: false,
    entities: ["dist/modules/index{.ts,.js}"],
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    cli: {
        migrationsDir: 'src/database/migrations',
    },
};

const dataSource = new DataSource(dataSourceOptions as DataSourceOptions)
export default dataSource;
