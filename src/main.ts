import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Config from './config/Config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  
  app.enableCors();
  app.setGlobalPrefix('api')
  await app.listen(Config.API_PORT);

  console.log('Server is Listening at ' + await app.getUrl())
}
bootstrap();
