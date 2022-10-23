import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { Product } from './entities/product.entity'
import { ShopService } from './shop.service'
import { ShopController } from './shop.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [ShopService],
  controllers: [ShopController]
})
export class ShopModule { }
