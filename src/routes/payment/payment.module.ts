import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventService } from 'src/routes/event/event.service';
import { OrderService } from 'src/routes/order/order.service';

@Module({
  imports: [AuthModule],
  providers: [
    PaymentResolver,
    PaymentService,
    PrismaService,
    EventService,
    OrderService,
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
