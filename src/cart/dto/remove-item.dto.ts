import { ApiProperty } from '@nestjs/swagger';

export class RemoveCartItemDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  productQuantity: number;

  @ApiProperty()
  productSize: string;
}
