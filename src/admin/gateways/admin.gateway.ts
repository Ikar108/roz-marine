import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import { AdminService } from "../admin.service"
import { Socket, Server } from "socket.io"
import { CreateProductDto } from "src/admin/dtos/create_product.dto"
import { UpdateProductDto } from "../dtos/update_product.dto"
import { DeleteProductDto } from "../dtos/delete_product.dto"
import { CreateCategoryDto } from "../dtos/create_category.dto"
import { UpdateCategoryDto } from "../dtos/update_category.dto"
import { DeleteCategoryDto } from "../dtos/delete_category.dto"
import { AddProductCategoryDto } from "../dtos/add_product_category.dto"
import { DeleteProductCategoryDto } from "../dtos/delete_product_category.dto"
import { CategoryService } from "src/admin/category.service"
import { ProductService } from "src/admin/product.service"
import { AdminRegisterDto } from "../dtos/admin_register.dto"

@WebSocketGateway()
export class AdminGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private adminService: AdminService
  ) { }

  @WebSocketServer() server: Server

  @SubscribeMessage('admin_register')
  async handleAdminRegistration(client: Socket, adminRegisterDto: AdminRegisterDto): Promise<void> {
    try {
      await this.adminService.adminRegister(adminRegisterDto)
      this.server.emit('admin_register_success')
    }
    catch (error) {
      console.log(error.message)
      this.server.emit('admin_register_error', error.message)
    }
  }

  @SubscribeMessage('create_product')
  async handleCreateProduct(client: Socket, create_product_dto: CreateProductDto): Promise<void> {
    try {
      await this.productService.createProduct(create_product_dto)
      let data = await this.adminService.getProductsCategories()
      this.server.emit('render_data', data)
      this.server.emit('create_product_success')
    } catch (error) {
      console.log(error.message)
      this.server.emit('create_product_error', error.message)
    }
  }

  @SubscribeMessage('update_product')
  async handleUpdateProduct(client: Socket, update_product_dto: UpdateProductDto): Promise<void> {
    try {
      await this.productService.updateProduct(update_product_dto)
      this.server.emit('update_product_success')
      let data = await this.adminService.getProductsCategories()
      this.server.emit('render_data', data)
    } catch (error) {
      console.log(error.message)
      this.server.emit('update_product_error', error.message)
    }
  }

  @SubscribeMessage('delete_product')
  async handleDeleteProduct(client: Socket, delete_product_dto: DeleteProductDto): Promise<void> {
    try {
      await this.productService.deleteProduct(delete_product_dto)
      this.server.emit('delete_product_success')
      let data = await this.adminService.getProductsCategories()
      this.server.emit('render_data', data)
    } catch (error) {
      console.log(error.message)
      this.server.emit('delete_product_error', error.message)
    }
  }

  @SubscribeMessage('create_category')
  async handleCreateCategory(client: Socket, create_category_dto: CreateCategoryDto): Promise<void> {
    try {
      await this.categoryService.createCategory(create_category_dto)
      this.server.emit('create_category_success')
      let data = await this.adminService.getProductsCategories()
      this.server.emit('render_data', data)
    } catch (error) {
      console.log(error.message)
      this.server.emit('create_category_error', error.message)
    }
  }

  @SubscribeMessage('update_category')
  async handleUpdateCategory(client: Socket, update_category_dto: UpdateCategoryDto): Promise<void> {
    try {
      await this.categoryService.updateCategory(update_category_dto)
      this.server.emit('update_category_success')
      let data = await this.adminService.getProductsCategories()
      this.server.emit('render_data', data)
    } catch (error) {
      console.log(error.message)
      this.server.emit('update_category_error', error.message)
    }
  }

  @SubscribeMessage('delete_category')
  async handleDeleteCategory(client: Socket, delete_category_dto: DeleteCategoryDto): Promise<void> {
    try {
      await this.categoryService.deleteCategory(delete_category_dto)
      this.server.emit('delete_category_success')
      let data = await this.adminService.getProductsCategories()
      this.server.emit('render_data', data)
    }
    catch (error) {
      console.log(error.message)
      this.server.emit('delete_category_error', error.message)
    }
  }

  @SubscribeMessage('add_product_category')
  async handleAddProductCategory(client: Socket, add_product_category_dto: AddProductCategoryDto): Promise<void> {
    try {
      await this.categoryService.addProductCategory(add_product_category_dto)
      this.server.emit('add_product_category_success')
      let data = await this.adminService.getProductsCategories()
      this.server.emit('render_data', data)
    } catch (error) {
      console.log(error.message)
      this.server.emit('add_product_category_error', error.message)
    }
  }

  @SubscribeMessage('delete_product_category')
  async handleDeleteProductCategory(client: Socket, delete_product_category_dto: DeleteProductCategoryDto): Promise<void> {
    try {
      await this.categoryService.deleteProductCategory(delete_product_category_dto)
      this.server.emit('delete_product_category_success')
      let data = await this.adminService.getProductsCategories()
      this.server.emit('render_data', data)
    } catch (error) {
      console.log(error.message)
      this.server.emit('delete_product_category_error', error.message)
    }
  }

  @SubscribeMessage('render_data')
  async renderData() {
    let data = await this.adminService.getProductsCategories()
    this.server.emit('render_data', data)
  }

  afterInit(server: Server) {
    console.log(server)
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnected: ' + client.id)
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('Connected: ' + client.id)
  }
}