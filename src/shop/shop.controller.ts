import { Body, Controller, Delete, Get, NotImplementedException, Param, Post, Render, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { LoadTimeInterceptor } from 'src/interceptors/load-time.interceptor'
import { GetCategoryDto } from './dtos/get_category.dto'
import { CreateCategoryDto } from './dtos/create_category.dto'
import { ProductDto } from './dtos/product.dto'
import { CategoryService, ProductService } from './shop.service'

@UseInterceptors(LoadTimeInterceptor)
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    private productService: ProductService
  ) { }

  @ApiOperation({
    summary: 'Get product render page'
  })
  @ApiParam({ name: 'id', type: 'numeric' })
  @ApiResponse({
    status: 200,
    description: 'The product page has been successfully loaded.'
  })
  @ApiResponse({
    status: 404,
    description: 'The product page was not found.'
  })
  @Get(':id')
  @Render('product')
  async getProductPage(@Param('id') id: number): Promise<ProductDto> {
    let product_dto = await this.productService.getProduct(id)
    return product_dto
  }

  @ApiOperation({
    summary: 'Add new product to catalogue'
  })
  @ApiBody({
    type: ProductDto,
    description: 'Store product structure',
  })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully added.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @Post()
  async createProduct(@Body() product_dto: ProductDto): Promise<void> {
    throw NotImplementedException
  }

  @ApiOperation({
    summary: 'Delete product from catalogue'
  })
  @ApiParam({ name: 'id', type: 'numeric' })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.'
  })
  @ApiResponse({
    status: 404,
    description: 'The product was not found.'
  })
  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    throw NotImplementedException
  }
}

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
  async createProduct(@Body() category_dto: CreateCategoryDto): Promise<void> {
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
  async deleteProduct(@Param('id') id: number): Promise<void> {
    throw NotImplementedException
  }
}
