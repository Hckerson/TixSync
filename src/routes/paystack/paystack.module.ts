import { Module } from '@nestjs/common';
import { Paystack } from './paystack.service';
import { PaymentModule } from '../payment/payment.module';
import { PaystackController } from './paystack.controller';

@Module({
  imports: [PaymentModule],
  controllers: [PaystackController],
  providers: [Paystack],
  exports: [Paystack],
})
export class PaystackModule {}
