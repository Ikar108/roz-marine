import { Category } from "src/shop/entities/category.entity"
import { Product } from "src/shop/entities/product.entity"

export class GetAdminPageDto {
  public name: string
  public categories: Category[]
  public products: Product[]
  //public full_table: any
}