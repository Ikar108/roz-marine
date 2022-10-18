import { Controller, Get, Render, UseInterceptors } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LoadTimeInterceptor } from './interceptors/load-time.interceptor'
import { Category } from './shop/entities/category.entity'

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  @UseInterceptors(LoadTimeInterceptor)
  @Get()
  @Render('index')
  async getMain() {
    let categories = await this.categoryRepository.find({
      relations: {
        image: true,
        slider_image: true,
        //products: true
      }
    })

    // categories.forEach(element => {
    //   element.count = element.products.length
    // })
    //
    //await this.categoryRepository.save(categories)

    return {
      categories: categories
    }
  }
}
