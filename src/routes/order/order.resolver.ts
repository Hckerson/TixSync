import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { PaymentService } from 'src/routes/payment/payment.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Payment } from 'src/routes/payment/entities/payment.entity';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly paymentService: PaymentService,
  ) {}

  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order], { name: 'orders' })
  async findAll() {
    return this.orderService.findAll();
  }

  @Query(() => Order, { name: 'order' })
  async findOne(@Args('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ) {
    return this.orderService.update(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  async removeOrder(@Args('id') id: string) {
    return this.orderService.remove(id);
  }

  @ResolveField('payment', () => Payment)
  async getPayment(@Parent() order: Order) {
    const { id } = order;
    return this.paymentService.findOneByOrderId(id);
  }
}
