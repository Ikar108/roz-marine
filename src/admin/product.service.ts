import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateProductDto } from 'src/admin/dtos/create_product.dto'
import { DeleteProductDto } from 'src/admin/dtos/delete_product.dto'
import { UpdateProductDto } from 'src/admin/dtos/update_product.dto'
import { Repository } from 'typeorm'
import { ProductDto } from '../shop/dtos/get_product_page.dto'
import { Category } from '../shop/entities/category.entity'
import { ImageEntity } from '../shop/entities/image.entity'
import { Product } from '../shop/entities/product.entity'
import { ProductImage } from '../shop/entities/product_image.entity'

var fs = require('fs')

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>
  ) { }

  async createProduct(create_product_dto: CreateProductDto): Promise<boolean> {
    let product = this.productRepository.create()
    product.name = create_product_dto.name
    product.description = create_product_dto.description
    product.preview_path = create_product_dto.image_paths[0]
    await this.productRepository.save(product)

    for (let i = 0; i < create_product_dto.image_paths.length; ++i) {
      let image: ImageEntity = this.imageRepository.create({ path: create_product_dto.image_paths[i] })
      await this.imageRepository.save(image)
      let product_image = this.productImageRepository.create({ product: product, image: image })
      await this.productImageRepository.save(product_image)
    }

    let category = await this.categoryRepository.findOne({
      relations: {
        products: true,
      },
      where: {
        category_id: create_product_dto.category_id
      }
    })
    category.products.push(product)
    category.count += 1

    await this.categoryRepository.save(category)

    return true
  }

  async updateProduct(update_product_dto: UpdateProductDto): Promise<boolean> {
    let product_to_update = await this.productRepository.findOne({
      where: {
        product_id: update_product_dto.product_id
      },
      relations: {
        categories: true,
        product_images: {
          image: true
        }
      }
    })

    if (!product_to_update) {
      throw new NotFoundException('Product was not found!')
    }

    product_to_update.name = update_product_dto.name
    product_to_update.description = update_product_dto.description
    product_to_update.preview_path = update_product_dto.image_paths[0]

    product_to_update.categories.forEach((category) => {
      category.count -= 1
    })

    await this.categoryRepository.save(product_to_update.categories)

    product_to_update.categories = []

    // May be just product_to_update.product_images = [] + save?
    // let product_images_to_delete: number[] = []
    product_to_update.product_images.forEach((product_image) => {
      // product_images_to_delete.push(product_image.product_image_id)
      if (product_image.image.path != '') {
        fs.unlink("./public/" + product_image.image.path, function (err) {
          if (err) {
            console.log(err)
          }
        })
      }
    })

    // await this.productImageRepository.delete(product_images_to_delete)
    product_to_update.product_images = []

    for (let i = 0; i < update_product_dto.image_paths.length; ++i) {
      let image: ImageEntity = this.imageRepository.create({ path: update_product_dto.image_paths[i] })
      await this.imageRepository.save(image)
      let product_image = this.productImageRepository.create({ product: product_to_update, image: image })
      await this.productImageRepository.save(product_image)
    }

    // console.log(update_product_dto)
    // let category = await this.categoryRepository.findOne({
    //   relations: {
    //     products: true,
    //   },
    //   where: {
    //     category_id: update_product_dto.category_id
    //   }
    // })

    // category.products.push(product_to_update)
    // category.count += 1

    await this.productRepository.save(product_to_update)

    //await this.categoryRepository.save(category)

    return true
  }

  async deleteProduct(delete_product_dto: DeleteProductDto): Promise<void> {
    let product_to_delete = await this.productRepository.findOne({
      where: {
        product_id: delete_product_dto.product_id
      },
      relations: {
        categories: true,
        product_images: {
          image: true
        }
      }
    })

    if (!product_to_delete) {
      throw new NotFoundException('Product was not found!')
    }


    product_to_delete.product_images.forEach((product_image) => {
      if (product_image.image.path != '') {
        fs.unlink("./public/" + product_image.image.path, function (err) {
          if (err) {
            console.log(err)
          }
        })
      }
    })

    product_to_delete.categories = []

    await this.productRepository.save(product_to_delete)
    await this.productRepository.remove(product_to_delete)
  }
}