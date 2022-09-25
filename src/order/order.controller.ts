import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Post()
  create(@Body() order: CreateOrderDto) {
    return this.orderService.create(order);
  }
}
