import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  sex: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  ratingId: number;

  @ApiProperty({
    type: 'object',
    additionalProperties: { type: 'number' },
    description: 'Object with size as key and quantity as value',
    example: { P: 10, M: 5, G: 2 },
  })
  availableSizeQtt: { [size: string]: number };
}
