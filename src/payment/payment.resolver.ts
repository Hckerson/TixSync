import { Payment } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { PaymentService } from './payment.service';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  createPayment(@Args('createPaymentInput') createPaymentInput: CreatePaymentInput) {
    return this.paymentService.create(createPaymentInput);
  }

  @Query(() => [Payment], { name: 'payments' })
  findAll() {
    return this.paymentService.findAll();
  }

  @Query(() => Payment, { name: 'payment' })
  findOne(@Args('id') id: string) {
    return this.paymentService.findOne(id);
  }

  @Mutation(() => Payment)
  updatePayment(@Args('updatePaymentInput') updatePaymentInput: UpdatePaymentInput) {
    return this.paymentService.update(updatePaymentInput.id, updatePaymentInput);
  }

  @Mutation(() => Payment)
  removePayment(@Args('id') id: string) {
    return this.paymentService.remove(id);
  }
}
