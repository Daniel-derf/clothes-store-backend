import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

// guards
import {
  AuthorizationGuard,
  OnlyAdminGuard,
} from '../authorization/authorization.guard';
import UpdateOrderStatusUseCase from './use-cases/UpdateOrderStatusUseCase';
import CreateOrderUseCase from './use-cases/CreateOrderUseCase';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject('IOrdersRepository') readonly ordersRepository) {}

  @Get('')
  async findAll(@Req() req) {
    const userId = req.user.id;

    const orders = await this.ordersRepository.findAllByUserId(userId);

    return orders;
  }

  @UseGuards(AuthorizationGuard)
  @Get(':id')
  async findOrderById(@Param() { id }) {
    const order = await this.ordersRepository.findById(+id);

    return order;
  }

  @UseGuards(OnlyAdminGuard)
  @Patch(':orderId/update-status')
  async updateOrderStatus(
    @Param() { orderId },
    @Body() { status }: UpdateOrderStatusDto,
  ) {
    const useCase = new UpdateOrderStatusUseCase(this.ordersRepository);

    await useCase.execute(+orderId, status);
  }

  @UseGuards(AuthorizationGuard)
  @Post('create-order')
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req) {
    const useCase = new CreateOrderUseCase(this.ordersRepository);

    await useCase.execute(createOrderDto, +req.user.id);
  }
}
