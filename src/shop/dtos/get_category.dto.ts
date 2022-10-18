import { ApiProperty } from "@nestjs/swagger"
import { Product } from "../entities/product.entity"

export class GetCategoryDto {

  @ApiProperty()
  public name: string

  @ApiProperty()
  public products: Product[]
}