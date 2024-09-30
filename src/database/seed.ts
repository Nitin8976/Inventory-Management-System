import { NestFactory } from '@nestjs/core';
import { Seeder } from './seeds/seeder';
import { SeedModule } from './seeds/seed.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);

  await appContext.get(Seeder).seed();
  await appContext.close();
}
bootstrap();
