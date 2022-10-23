import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ schema: "public", name: "image" })
export class ImageEntity {

  @PrimaryGeneratedColumn()
  public image_id: number

  @Column({ nullable: true })
  public path: string
}