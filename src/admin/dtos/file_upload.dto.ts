import { ApiProperty } from '@nestjs/swagger'

export class FilesUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File[]
}