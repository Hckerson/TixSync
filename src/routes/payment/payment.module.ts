import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { EventService } from 'src/routes/event/event.service';
import { OrderService } from 'src/routes/order/order.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    PaymentResolver,
    PaymentService,
    PrismaService,
    EventService,
    OrderService,
  ],
})
export class PaymentModule {}
