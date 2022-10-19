import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { GetCategoryDto } from './dtos/get_category.dto'
import { Category } from './entities/category.entity'

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