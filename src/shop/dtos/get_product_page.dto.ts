import { ApiProperty } from "@nestjs/swagger"

export class ProductDto {

  @ApiProperty()
  public name: string

  @ApiProperty()
  public description: string

  @ApiProperty()
  public image_paths: string[]
}