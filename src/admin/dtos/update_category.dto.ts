import { ApiProperty } from "@nestjs/swagger"

export class UpdateCategoryDto {

  @ApiProperty()
  public category_id: number

  @ApiProperty()
  public name: string

  @ApiProperty()
  public image_path: string

  @ApiProperty()
  public slider_path: string

}