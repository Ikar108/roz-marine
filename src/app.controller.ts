import { Controller, Get, Render, UseInterceptors } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LoadTimeInterceptor } from './interceptors/load-time.interceptor'
import { Category } from './shop/entities/category.entity'

@ApiTags('default')
@UseInterceptors(LoadTimeInterceptor)
@Controller()
export class AppController {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  @ApiOperation({
    summary: 'Get root render page (catalogue)'
  })
  @ApiResponse({
    status: 200,
    description: 'The root page has been successfully loaded.'
  })
  @ApiResponse({
    status: 404,
    description: 'The root page was not found.'
  })
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
