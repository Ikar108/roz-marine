import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { LoadTimeInterceptor } from './interceptors/load-time.interceptor';
//import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const hbs = require('hbs')
  const expressHbs = require('express-handlebars');
  
  app.useStaticAssets(join(__dirname, '..' ,'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  app.useGlobalInterceptors(new LoadTimeInterceptor());
  
  await app.listen(3000);
}
bootstrap();
