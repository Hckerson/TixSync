import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PaymentService } from './payment.service';
import { EventModule } from '../event/event.module';
import { OrderModule } from '../order/order.module';
import { PaymentResolver } from './payment.resolver';
import { QrcodeService } from 'src/lib/qr-code.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [AuthModule, EventModule, forwardRef(() => OrderModule)],
  providers: [
    PaymentResolver,
    PaymentService,
    QrcodeService,
    PrismaService,
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
