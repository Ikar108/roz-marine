import { ApiProperty } from "@nestjs/swagger"

export class CreateProductDto {

  @ApiProperty()
  public name: string

  @ApiProperty()
  public description: string

  @ApiProperty()
  public category: number

  @ApiProperty()
  public image_paths: string[]
}