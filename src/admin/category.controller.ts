import { Body, Controller, Delete, Injectable, Post, Put, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoadTimeInterceptor } from 'src/interceptors/load-time.interceptor'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from 'src/admin/dtos/create_category.dto'
import { UpdateCategoryDto } from 'src/admin/dtos/update_category.dto'
import { DeleteCategoryDto } from 'src/admin/dtos/delete_category.dto'
import { AddProductCategoryDto } from './dtos/add_product_category.dto'
import { DeleteProductCategoryDto } from './dtos/delete_product_category.dto'

@UseInterceptors(LoadTimeInterceptor)
@Injectable()
@ApiTags('admin')
@Controller('admin/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

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
    await this.categoryService.createCategory(category_dto)
  }

  @ApiOperation({
    summary: 'Update the category in catalogue'
  })
  @ApiBody({
    type: UpdateCategoryDto,
    description: 'The category structure',
  })
  @ApiResponse({
    status: 201,
    description: 'The category has been successfully updated.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @Put()
  async updateCategory(@Body() category_dto: UpdateCategoryDto): Promise<void> {
    await this.categoryService.updateCategory(category_dto)
  }

  @ApiOperation({
    summary: 'Delete category from catalogue'
  })
  @ApiBody({
    type: DeleteCategoryDto,
    description: 'The category structure',
  })
  @ApiResponse({
    status: 200,
    description: 'The category has been successfully deleted.'
  })
  @ApiResponse({
    status: 404,
    description: 'The category was not found.'
  })
  @Delete()
  async deleteCategory(@Body() category_dto: DeleteCategoryDto): Promise<void> {
    await this.categoryService.deleteCategory(category_dto)
  }

  @ApiOperation({
    summary: 'Add products to category'
  })
  @ApiParam({ name: 'id', type: 'numeric' })
  @ApiBody({
    type: AddProductCategoryDto,
    description: 'The category structure',
  })
  @ApiResponse({
    status: 200,
    description: 'The products had been successfully added.'
  })
  @ApiResponse({
    status: 404,
    description: 'The category was not found.'
  })
  @Post('product')
  async addProductCategory(@Body() category_dto: AddProductCategoryDto): Promise<void> {
    await this.categoryService.addProductCategory(category_dto)
  }

  @ApiOperation({
    summary: 'Delete products from category'
  })
  @ApiBody({
    type: DeleteProductCategoryDto,
    description: 'The category structure',
  })
  @ApiResponse({
    status: 200,
    description: 'The products has been successfully deleted.'
  })
  @ApiResponse({
    status: 404,
    description: 'The category was not found.'
  })
  @Delete('product')
  async deleteProductCategory(@Body() category_dto: DeleteProductCategoryDto): Promise<void> {
    await this.categoryService.deleteProductCategory(category_dto)
  }
}
