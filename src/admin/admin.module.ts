import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryController } from 'src/admin/category.controller'
import { Category } from 'src/shop/entities/category.entity'
import { ImageEntity } from 'src/shop/entities/image.entity'
import { Product } from 'src/shop/entities/product.entity'
import { ProductImage } from 'src/shop/entities/product_image.entity'
import { ProductController } from 'src/admin/product.controller'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { CategoryService } from './category.service'
import { AdminGateway } from './gateways/admin.gateway'
import { ProductService } from './product.service'
import { AdminEntity } from './entities/admin.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, ProductImage, ImageEntity, AdminEntity]), MulterModule],
  controllers: [AdminController, ProductController, CategoryController],
  providers: [AdminService, AdminGateway, ProductService, CategoryService]
})
export class AdminModule { }
