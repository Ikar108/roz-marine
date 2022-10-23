import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminEntity } from 'src/admin/entities/admin.entity'
import { Category } from 'src/shop/entities/category.entity'
import { ImageEntity } from 'src/shop/entities/image.entity'
import { Product } from 'src/shop/entities/product.entity'
import { ProductImage } from 'src/shop/entities/product_image.entity'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cd73fl82i3mt3nk5474g-a.oregon-postgres.render.com',
      port: 5432,
      username: 'ikar108',
      password: process.env.db_password,
      database: 'roz_marine_database',
      entities: [Category, ImageEntity, ProductImage, Product, AdminEntity],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    })
  ]
})
export class DbModule { }
