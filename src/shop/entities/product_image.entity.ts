import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ImageEntity } from './image.entity'
import { Product } from './product.entity'

@Entity({ schema: "public", name: "product_image" })
export class ProductImage {

  @PrimaryGeneratedColumn()
  public product_image_id: number

  @ManyToOne(() => Product, (product) => product.product_images)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "product_id",
    foreignKeyConstraintName: "fk_product_id",
  })
  public product: Product

  @OneToOne(() => ImageEntity)
  @JoinColumn({
    name: "image_id",
    referencedColumnName: "image_id",
    foreignKeyConstraintName: "fk_image_id",
  })
  public image: ImageEntity

}