import { Body, Controller, Delete, Get, NotImplementedException, Param, Post, Put, Render, UseInterceptors } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateProductDto } from 'src/admin/dtos/create_product.dto'
import { DeleteProductDto } from 'src/admin/dtos/delete_product.dto'
import { UpdateProductDto } from 'src/admin/dtos/update_product.dto'
import { LoadTimeInterceptor } from 'src/interceptors/load-time.interceptor'
import { ProductService } from './product.service'

@UseInterceptors(LoadTimeInterceptor)
@ApiTags('admin')
@Controller('admin/product')
export class ProductController {
  constructor(
    private productService: ProductService
  ) { }

  @ApiOperation({
    summary: 'Add new product to catalogue'
  })
  @ApiBody({
    type: CreateProductDto,
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
  async createProduct(@Body() product_dto: CreateProductDto): Promise<void> {
    await this.productService.createProduct(product_dto)
  }


  @ApiOperation({
    summary: 'Update the product in catalogue'
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Store product structure',
  })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully updated.'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.'
  })
  @Put()
  async updateProduct(@Body() product_dto: UpdateProductDto): Promise<void> {
    await this.productService.updateProduct(product_dto)
  }

  @ApiOperation({
    summary: 'Delete product from catalogue'
  })
  @ApiBody({
    type: DeleteProductDto,
    description: 'Store product structure',
  })
  @ApiResponse({
    status: 200,
    description: 'The product has been successfully deleted.'
  })
  @ApiResponse({
    status: 404,
    description: 'The product was not found.'
  })
  @Delete()
  async deleteProduct(@Body() product_dto: DeleteProductDto): Promise<void> {
    await this.productService.deleteProduct(product_dto)
  }
}