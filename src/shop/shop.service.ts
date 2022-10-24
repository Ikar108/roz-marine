import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { GetCategoryDto } from "./dtos/get_category.dto"
import { ProductDto } from "./dtos/get_product_page.dto"
import { Category } from "./entities/category.entity"
import { Product } from "./entities/product.entity"

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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
    if (category_entity == null) {
      throw new NotFoundException("Con not find this category!")
    }
    return {
      name: category_entity.name,
      products: category_entity.products
    }
  }
}