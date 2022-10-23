import { Controller, Get, Param, Render, UseInterceptors } from "@nestjs/common"
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import { LoadTimeInterceptor } from "src/interceptors/load-time.interceptor"
import { GetCategoryDto } from "./dtos/get_category.dto"
import { ProductDto } from "./dtos/get_product_page.dto"
import { ShopService } from "./shop.service"

@UseInterceptors(LoadTimeInterceptor)
@ApiTags('shop')
@Controller('shop')
export class ShopController {
  constructor(
    private shopService: ShopService
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
  @Get('product/:id')
  @Render('product')
  async getProductPage(@Param('id') id: number): Promise<ProductDto> {
    let product_dto = await this.shopService.getProduct(id)
    return product_dto
  }

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
  @Get('category/:id')
  @Render('category')
  async getCategoryPage(@Param('id') id: number): Promise<GetCategoryDto> {
    let category_dto = await this.shopService.getCategory(id)
    return category_dto
  }
}