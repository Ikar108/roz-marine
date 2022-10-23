import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from 'src/shop/entities/category.entity'
import { Product } from 'src/shop/entities/product.entity'
import { signUp } from 'supertokens-node/lib/build/recipe/emailpassword'
import { SessionContainer } from 'supertokens-node/recipe/session'
import { Repository } from 'typeorm'
import { AdminRegisterDto } from './dtos/admin_register.dto'
import { GetAdminPageDto } from './dtos/get_admin_page.dto'
import { AdminEntity } from './entities/admin.entity'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async adminRegister(adminRegisterDto: AdminRegisterDto): Promise<void> {
    let sign_up_result = await signUp(adminRegisterDto.email, adminRegisterDto.password)
    if (sign_up_result.status == "OK") {
      await this.adminRepository.insert({
        uuid: sign_up_result.user.id,
        name: adminRegisterDto.name,
      })
    } else {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST)
    }
  }

  async getAdminPage(session: SessionContainer): Promise<GetAdminPageDto> {
    // let full_table = await this.categoryRepository.query(
    //   "SELECT category.category_id, category.name as category_name, product.product_id, product.name as product_name " +
    //   "FROM category " +
    //   "FULL JOIN product_category ON category.category_id = product_category.category_id " +
    //   "FULL JOIN product ON product_category.product_id = product.product_id ")
    let data = await this.getProductsCategories()
    let admin = await this.adminRepository.findOne({
      where: {
        uuid: session.getUserId()
      }
    })
    return {
      name: admin.name,
      categories: data.categories,
      products: data.products
      //full_table: full_table
    }
  }

  async getProductsCategories() {
    let categories = await this.categoryRepository.find({
      relations: {
        products: true,
      }
    })
    let products = await this.productRepository.find()

    return {
      categories: categories,
      products: products
    }
  }
}
