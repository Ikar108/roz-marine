import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { join } from 'path'
import { AppModule } from './app.module'
import { LoadTimeInterceptor } from './interceptors/load-time.interceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const hbs = require('hbs')
  const expressHbs = require('express-handlebars')
  const config = new DocumentBuilder()
    .setTitle('Maria Alekseitseva roses catalog')
    .setDescription('The API of the Maria Alekseitseva roses catalog.')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs')
  hbs.registerPartials(join(__dirname, '..', 'views/partials'))
  app.useGlobalInterceptors(new LoadTimeInterceptor())

  await app.listen(3000)
}
bootstrap()
