import { Status } from 'src/enums/status.enum';
import { Order } from 'src/routes/order/entities/order.entity';
import { Event } from 'src/event/entities/event.entity';
import {
  ObjectType,
  Field,
  Int,
  ID,
  GraphQLISODateTime,
} from '@nestjs/graphql';

@ObjectType()
export class Payment {
  @Field((type) => ID)
  id: string;

  @Field((type) => Int)
  amount: number;

  @Field()
  orderId: string;

  @Field((type) => Order)
  order: Order;

  @Field((type) => Status)
  status: Status;

  @Field((type) => GraphQLISODateTime)
  paidAt: Date;
}
