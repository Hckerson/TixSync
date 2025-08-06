import { Order } from './order.model';
import { Event } from './event.model';
import { Status } from 'src/enums/status.enum';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Payment {
  @Field((type) => ID)
  id: string;

  @Field()
  eventId: string;

  @Field((type) => Int)
  amount: number;

  @Field()
  orderId: string;

  @Field((type) => Order)
  order: Order;

  @Field((type) => Status)
  status: Status;

  @Field((type) => Date)
  paidAt: Date;

  @Field((type) => Event)
  event: Event;
}
