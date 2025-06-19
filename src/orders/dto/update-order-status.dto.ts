import { ApiProperty } from '@nestjs/swagger';
import { Status } from '../entities/order.entity';
import { IsEnum } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  status: Status;
}
