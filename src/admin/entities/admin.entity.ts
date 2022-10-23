import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ schema: "public", name: "admin" })
export class AdminEntity {

  @PrimaryColumn()
  public uuid: string

  @Column({ nullable: true })
  public name: string
}