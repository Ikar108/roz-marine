import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GetCategoryDto } from './dtos/get_category.dto'
import { ProductDto } from './dtos/product.dto'
import { Category } from './entities/category.entity'
import { Product } from './entities/product.entity'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) { }
  async getProduct(id: number): Promise<ProductDto> {
    let product_entity = await this.productRepository.findOne({
      where: {
        product_id: id
      }
      ,
      relations: {
        categories: false,
        product_images: {
          image: true
        }
      }
    })
    let product_dto = {
      name: product_entity.name,
      description: product_entity.description,
      image_paths: []
    }
    product_entity.product_images.forEach(product_image => {
      product_dto.image_paths.push(product_image.image.path)
    })

    return product_dto
  }
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }
  async getCategory(id: number): Promise<GetCategoryDto> {
    let category_entity = await this.categoryRepository.findOne({
      where: {
        category_id: id
      },
      relations: {
        image: false,
        slider_image: false,
        products: {
          categories: false,
          product_images: false
        }
      }
    })
    return {
      name: category_entity.name,
      products: category_entity.products
    }
  }
}