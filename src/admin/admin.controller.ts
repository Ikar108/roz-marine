import { Controller, Get, Post, Render, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { diskStorage } from 'multer'
import { FilesUploadDto } from 'src/admin/dtos/file_upload.dto'
import { Category } from 'src/shop/entities/category.entity'
import { Repository } from 'typeorm'
import { GetAdminPageDto } from './dtos/get_admin_page.dto'

@Controller('admin')
export class AdminController {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  @Get()
  @Render('admin')
  async getAdminPage(): Promise<GetAdminPageDto> {
    let categories = await this.categoryRepository.find({
      relations: {
        products: true,
        image: false
      }
    })
    return {
      categories: categories
    }
  }

  @ApiOperation({
    summary: 'Upload product image to disk'
  })
  @ApiBody({
    type: FilesUploadDto,
    description: 'Picture files',
  })
  @ApiResponse({
    status: 201,
    description: 'The image has been successfully uploaded.'
  })
  @ApiResponse({
    status: 403,
    description: 'You should be admin to upload pictures.'
  })
  @Post('upload/product/images')
  @UseInterceptors(FilesInterceptor('images', 10, {
    storage: diskStorage({
      destination: './public/pic/products',
      filename: (req, file, cb) => {
        const unique_suffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + unique_suffix + '.' + file.mimetype.substring(6))
      }
    })
  }))
  async uploadProductImages(@UploadedFiles() files) {
    let file_paths: string[] = []
    files.forEach(file => {
      file_paths.push('/pic/products/' + file.filename)
    })
    return { file_paths: file_paths }
  }

  @ApiOperation({
    summary: 'Upload category or slider pictures to disk'
  })
  @ApiBody({
    type: FilesUploadDto,
    description: 'Picture files',
  })
  @ApiResponse({
    status: 201,
    description: 'The pictures have been successfully uploaded.'
  })
  @ApiResponse({
    status: 403,
    description: 'You should be admin to upload pictures.'
  })
  @Post('upload/category/images')
  @UseInterceptors(FilesInterceptor('images', 1, {
    storage: diskStorage({
      destination: './public/pic/categories',
      filename: (req, file, cb) => {
        const unique_suffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + unique_suffix + '.' + file.mimetype.substring(6))
      }
    })
  }))
  async uploadCategoryImages(@UploadedFiles() files) {
    let file_paths: string[] = []
    files.forEach(file => {
      file_paths.push('/pic/categories/' + file.filename)
    })
    return { file_paths: file_paths }
  }
}
