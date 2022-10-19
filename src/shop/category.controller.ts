import { Body, Controller, Delete, Get, NotImplementedException, Param, Post, Render, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoadTimeInterceptor } from 'src/interceptors/load-time.interceptor'
import { GetCategoryDto } from './dtos/get_category.dto'
import { CreateCategoryDto } from './dtos/create_category.dto'
import { CategoryService } from './category.service'

@UseInterceptors(LoadTimeInterceptor)
@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  @ApiOperation({
    summary: 'Get category render page'
  })
  @ApiParam({ name: 'id', type: 'numeric' })
  @ApiResponse({
    status: 200,
    description: 'The category page has been successfully loaded.'
  })
  @ApiResponse({
    status: 404,
    description: 'The category page was not found.'
  })
  @Get(':id')
  @Render('category')
  async getCategoryPage(@Param('id') id: number): Promise<GetCategoryDto> {
    let category_dto = await this.categoryService.getCategory(id)
    return category_dto
  }

  @ApiOperation({
    summary: 'Add new category to catalogue'
  })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'The category structure',
  })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully added.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @Post()
  async createCategory(@Body() category_dto: CreateCategoryDto): Promise<void> {
    throw NotImplementedException
  }

  @ApiOperation({
    summary: 'Delete category from catalogue'
  })
  @ApiParam({ name: 'id', type: 'numeric' })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted.'
  })
  @ApiResponse({
    status: 404,
    description: 'The category was not found.'
  })
  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    throw NotImplementedException
  }
}
