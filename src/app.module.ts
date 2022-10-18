import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { Category } from './shop/entities/category.entity';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [DbModule, TypeOrmModule.forFeature([Category]), ShopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
