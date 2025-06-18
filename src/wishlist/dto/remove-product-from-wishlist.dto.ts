import { ApiProperty } from '@nestjs/swagger';

export class RemoveFromWishlistDto {
  @ApiProperty({ type: [Number] })
  productsIds: number[];
}
