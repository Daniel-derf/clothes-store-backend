import { ApiProperty } from '@nestjs/swagger';

export class AddCartItemDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  productQuantity: number;

  @ApiProperty()
  productSize: string;
}
