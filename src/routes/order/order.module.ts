import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { PaymentModule } from '../payment/payment.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentService } from 'src/routes/payment/payment.service';

@Module({
  imports: [PaymentModule],
  providers: [OrderResolver, OrderService, PrismaService],
  exports: [OrderService]
})
export class OrderModule {}
