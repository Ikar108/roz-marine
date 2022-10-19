import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Product } from './entities/product.entity'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [CategoryService, ProductService],
  controllers: [CategoryController, ProductController]
})
export class ShopModule { }
