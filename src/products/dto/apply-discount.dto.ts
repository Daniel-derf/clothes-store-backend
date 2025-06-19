import { ApiProperty } from '@nestjs/swagger';

export class ApplyDiscountDto {
  @ApiProperty()
  discount: number;
}
