import { ApiProperty } from "@nestjs/swagger"

export class UpdateProductDto {

  @ApiProperty()
  public product_id: number

  @ApiProperty()
  public name: string

  @ApiProperty()
  public description: string

  @ApiProperty()
  public category_id: number

  @ApiProperty()
  public image_paths: string[]
}