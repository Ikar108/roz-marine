import { ApiProperty } from "@nestjs/swagger"

export class CreateCategoryDto {

  @ApiProperty()
  public name: string

  @ApiProperty()
  public image_path: string

  @ApiProperty()
  public slider_path: string

}