import { Entity, Column, ManyToMany, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Category } from './category.entity'
import { ProductImage } from './product_image.entity'

@Entity({ schema: "public", name: "product" })
export class Product {

  @PrimaryGeneratedColumn()
  public product_id: number

  @Column({ nullable: false })
  public name: string

  @Column({ nullable: true })
  public description: string

  @Column({ nullable: true })
  public preview_path: string

  @ManyToMany(() => Category, (category) => category.products)
  public categories: Category[]

  @OneToMany(() => ProductImage, (product_image) => product_image.product, { cascade: true })
  public product_images: ProductImage[]
}