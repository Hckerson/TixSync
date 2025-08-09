import { Status } from 'src/enums/status.enum';
import { CreateOrderInput } from 'src/order/dto/create-order.input';
import { CreateEventInput } from 'src/event/dto/create-event.input';
import { ObjectType,InputType, Field, Int, ID, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field()
  eventId: string;

  @Field((type) => Int)
  amount: number;

  @Field()
  orderId: string;

  @Field((type) => Status)
  status: Status;

  @Field((type) => GraphQLISODateTime)
  paidAt: Date;

}
