import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProductDto } from './dtos/create_product.dto'
import { ProductDto } from './dtos/get_product_page.dto'
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

  async addProduct(product: CreateProductDto) {

  }
}