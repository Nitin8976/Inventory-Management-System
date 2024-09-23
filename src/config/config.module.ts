import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import * as path from 'path';
import app from './app.config';
import database from '../database/config/database.config';
import { I18nModule, HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigModule } from 'src/database/typeorm-config.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

const loadConfig = [app, database];
const currentEnv = process.env.NODE_ENV || 'local';

console.info('Current Environment: ' + currentEnv);

@Module({
  imports: [
    TypeOrmConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: loadConfig,
      envFilePath: path.resolve(process.cwd(), 'env', `.env.${currentEnv}`),
    }),
    // I18nModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
    //       infer: true,
    //     }),
    //     loaderOptions: { path: path.join(__dirname, '../i18n/'), watch: true },
    //   }),
    //   resolvers: [
    //     {
    //       use: HeaderResolver,
    //       useFactory: (configService: ConfigService) => {
    //         return [
    //           configService.get('app.headerLanguage', {
    //             infer: true,
    //           }),
    //         ];
    //       },
    //       inject: [ConfigService],
    //     },
    //   ],
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    // }),
    EventEmitterModule.forRoot()
  ]
})
export class AppConfigModule { }
