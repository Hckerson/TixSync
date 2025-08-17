import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { OrderService } from 'src/routes/order/order.service';
import { EventService } from 'src/routes/event/event.service';
import { Order } from 'src/routes/order/entities/order.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly eventService: EventService,
    private readonly paymentService: PaymentService,
  ) {}

  @Mutation(() => Payment)
  createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ) {
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
  updatePayment(
    @Args('updatePaymentInput') updatePaymentInput: UpdatePaymentInput,
  ) {
    return this.paymentService.update(
      updatePaymentInput.id,
      updatePaymentInput,
    );
  }

  @Mutation(() => Payment)
  removePayment(@Args('id') id: string) {
    return this.paymentService.remove(id);
  }

  @ResolveField('order', () => Order)
  async getOrder(@Parent() payment: Payment) {
    const { id } = payment;
    return this.orderService.findOneByPaymentId(id);
  }

  // @ResolveField('event', () => Event)
  // async getEvent(@Parent() payment: Payment) {
  //   const { id } = payment;
  //   return this.eventService.findOneByPaymentId(id);
  // }
}
