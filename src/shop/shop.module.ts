import { Module } from '@nestjs/common'
import { CategoryService, ProductService } from './shop.service'
import { CategoryController, ProductController } from './shop.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Product } from './entities/product.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [CategoryService, ProductService],
  controllers: [CategoryController, ProductController]
})
export class ShopModule { }
