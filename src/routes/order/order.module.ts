import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentService } from 'src/payment/payment.service';

@Module({
  providers: [OrderResolver, OrderService, PaymentService, PrismaService],
})
export class OrderModule {}
