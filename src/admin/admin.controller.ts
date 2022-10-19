import { Controller, Get, Post, Render, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { Category } from 'src/shop/entities/category.entity';
import { Repository } from 'typeorm';
import { GetAdminPageDto } from './dtos/get_admin_page.dto';

@Controller('admin')
export class AdminController {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  @Get()
  @Render('admin')
  async getAdminPage(): Promise<GetAdminPageDto> {
    let categories = await this.categoryRepository.find()
    return {
      categories: categories
    }
  }

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
}
