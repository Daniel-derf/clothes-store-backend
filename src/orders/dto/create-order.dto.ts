import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../entities/order.entity';
import { IsEnum } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  userId: number;

  @ApiProperty({ type: [Number] })
  productsIds: number[];

  @ApiProperty()
  totalPrice: number;

  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  status: Status;
}
