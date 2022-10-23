import { ApiProperty } from '@nestjs/swagger'
import { Express } from 'express'

export class FilesUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File[]
}