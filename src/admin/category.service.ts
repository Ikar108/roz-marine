import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCategoryDto } from 'src/admin/dtos/create_category.dto'
import { DeleteCategoryDto } from 'src/admin/dtos/delete_category.dto'
import { UpdateCategoryDto } from 'src/admin/dtos/update_category.dto'
import { Repository } from 'typeorm'
import { Category } from '../shop/entities/category.entity'
import { ImageEntity } from '../shop/entities/image.entity'
import { Product } from '../shop/entities/product.entity'
import { AddProductCategoryDto } from './dtos/add_product_category.dto'
import { DeleteProductCategoryDto } from './dtos/delete_product_category.dto'

var fs = require('fs')

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) { }

  async createCategory(create_category_dto: CreateCategoryDto): Promise<void> {
    let category = this.categoryRepository.create()
    category.name = create_category_dto.name

    let image: ImageEntity = this.imageRepository.create({ path: create_category_dto.image_path })
    let slider: ImageEntity = this.imageRepository.create({ path: create_category_dto.slider_path })

    await this.imageRepository.save([image, slider])

    category.image = image
    category.slider_image = slider

    await this.categoryRepository.save(category)
  }

  async updateCategory(update_category_dto: UpdateCategoryDto): Promise<void> {
    let category_to_update = await this.categoryRepository.findOne({
      where: {
        category_id: update_category_dto.category_id
      },
      relations: {
        image: true,
        slider_image: true
      }
    })

    if (!category_to_update) {
      throw new NotFoundException('Category was not found!')
    }

    if (category_to_update.slider_image.path != '') {
      fs.unlink("./public/" + category_to_update.image.path, function (err) {
        if (err) {
          console.log(err)
        }
      })
    }

    if (category_to_update.slider_image.path != '') {
      fs.unlink("./public/" + category_to_update.slider_image.path, function (err) {
        if (err) {
          console.log(err)
        }
      })
    }

    let images_to_delete = [category_to_update.image_id, category_to_update.slider_image_id]
    category_to_update.image = null
    category_to_update.slider_image = null
    await this.categoryRepository.save(category_to_update)
    await this.imageRepository.delete(images_to_delete)

    let image: ImageEntity = this.imageRepository.create({ path: update_category_dto.image_path })
    let slider: ImageEntity = this.imageRepository.create({ path: update_category_dto.slider_path })

    category_to_update.name = update_category_dto.name
    category_to_update.image = image
    category_to_update.slider_image = slider

    await this.categoryRepository.save(category_to_update)
  }

  async deleteCategory(delete_category_dto: DeleteCategoryDto): Promise<void> {
    let category_to_delete = await this.categoryRepository.findOne({
      where: {
        category_id: delete_category_dto.category_id
      },
      relations: {
        products: true,
        image: true,
        slider_image: true
      }
    })

    if (!category_to_delete) {
      throw new NotFoundException('Category was not found!')
    }

    // How to save changes in categories?
    // let products_to_delete: number[] = []
    // category_to_delete.products.forEach((product) => {
    //   if (product.categories.length < 2) {
    //   products_to_delete.push(product.product_id)
    //     product.categories.forEach((category) => {
    //       category.count -= 1
    //     })
    //   }
    // })
    category_to_delete.products = []
    let images = [category_to_delete.image_id, category_to_delete.slider_image_id]


    await this.categoryRepository.save(category_to_delete)
    //await this.productRepository.delete(products_to_delete)

    if (category_to_delete.image.path != '') {
      fs.unlink("./public/" + category_to_delete.image.path, function (err) {
        if (err) {
          console.log(err)
        }
      })
    }

    if (category_to_delete.slider_image.path != '') {
      fs.unlink("./public/" + category_to_delete.slider_image.path, function (err) {
        if (err) {
          console.log(err)
        }
      })
    }

    await this.categoryRepository.delete(category_to_delete.category_id)

    await this.imageRepository.delete(images)

  }


  async addProductCategory(add_product_category_dto: AddProductCategoryDto): Promise<boolean> {
    let category_to_change = await this.categoryRepository.findOne({
      where: {
        category_id: add_product_category_dto.category_id
      },
      relations: {
        products: true
      }
    })

    let product_category_ids: number[] = []
    add_product_category_dto.product_ids.split(' ').forEach((id) => {
      product_category_ids.push(parseInt(id))
    })

    // How to find products in categories?
    let products_to_add: Product[] = [];
    (await this.productRepository.find()).forEach((product) => {
      if (product_category_ids.indexOf(product.product_id) != -1) {
        products_to_add.push(product)
      }
    })

    category_to_change.products.concat(products_to_add)
    category_to_change.count += products_to_add.length

    await this.categoryRepository.save(category_to_change)

    return true
  }

  async deleteProductCategory(delete_product_category_dto: DeleteProductCategoryDto): Promise<boolean> {
    let category_to_change = await this.categoryRepository.findOne({
      where: {
        category_id: delete_product_category_dto.category_id
      },
      relations: {
        products: true
      }
    })

    let product_category_ids: number[] = []
    delete_product_category_dto.product_ids.split(' ').forEach((id) => {
      product_category_ids.push(parseInt(id))
    })
    // How to save canges in categories?
    let products_to_delete: number[] = []
    category_to_change.products.forEach((product) => {
      if (product_category_ids.indexOf(product.product_id) != -1) {
        // if (product.categories.length < 2) {
        products_to_delete.push(product.product_id)
        //   product.categories.forEach((category) => {
        //     category.count -= 1
        //   })
        // }
        // else {
        category_to_change.count -= 1
        //}
        category_to_change.products.splice(category_to_change.products.indexOf(product, 0), 1)
      }
    })
    // How to accurate remove many elements from array?^^^

    await this.categoryRepository.save(category_to_change)

    await this.productRepository.delete(products_to_delete)

    return true
  }

}