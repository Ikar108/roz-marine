import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'
import { ImageEntity } from './image.entity'
import { Product } from './product.entity'

@Entity({ schema: "public", name: "category" })
export class Category {

  @PrimaryGeneratedColumn()
  public category_id: number

  @Column({ nullable: true })
  public name: string

  @Column({ nullable: true })
  public image_id: number

  @Column({ nullable: true })
  public slider_image_id: number

  @Column({ nullable: false, default: 0 })
  public count: number

  @OneToOne(() => ImageEntity, { cascade: true })
  @JoinColumn({
    name: "image_id",
    referencedColumnName: "image_id",
    foreignKeyConstraintName: "fk_image_id",
  })
  public image: ImageEntity

  @OneToOne(() => ImageEntity, { cascade: true })
  @JoinColumn({
    name: "slider_image_id",
    referencedColumnName: "image_id",
    foreignKeyConstraintName: "fk_slider_image_id"
  })
  public slider_image: ImageEntity

  @ManyToMany(() => Product, (product) => product.categories)
  @JoinTable({
    name: "product_category",
    joinColumn: {
      name: "category_id",
      referencedColumnName: "category_id"
    },
    inverseJoinColumn: {
      name: "product_id",
      referencedColumnName: "product_id"
    }
  })
  public products: Product[]
}