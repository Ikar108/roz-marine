import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/shop/entities/category.entity';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), MulterModule],
  controllers: [AdminController]
})
export class AdminModule { }
