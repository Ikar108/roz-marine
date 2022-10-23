import { ApiProperty } from '@nestjs/swagger'

export class AdminRegisterDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}