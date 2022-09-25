import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/createOrder.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  public async findAll() {
    const orders = await this.prisma.order.findMany();
    return orders;
  }

  // TODO: change user id to current user id
  public async create(dto: CreateOrderDto) {
    const order = await this.prisma.order.create({
      data: {
        ...dto,
        userId: 45,
      },
    });
  }
}
