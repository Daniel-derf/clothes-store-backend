import { ApiProperty } from '@nestjs/swagger';

export class AddProductToWishlistDto {
  @ApiProperty({ type: [Number] })
  productsIds: number[];
}
