import { Venue } from 'src/venue/entities/venue.entity';
import { EventCategory } from 'src/enums/eventCategory.enum';
import { Payment } from 'src/payment/entities/payment.entity';
import { CreateTicketInput } from 'src/ticket/dto/create-ticket.input';
import { CreatePaymentInput } from 'src/payment/dto/create-payment.input';
import { InputType, Int, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { CreateTickettypeInput } from 'src/tickettype/dto/create-tickettype.input';

@InputType()
export class CreateEventInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => EventCategory)
  category: EventCategory;

  @Field()
  organizerId: string;

  @Field(() => GraphQLISODateTime)
  startTime: Date;

  @Field(() => [CreateTickettypeInput])
  ticketType: CreateTickettypeInput[];

  @Field(() => [CreateTicketInput])
  ticket: CreateTicketInput[];

  @Field(() => [CreatePaymentInput])
  payment: CreatePaymentInput[];

  @Field(() => GraphQLISODateTime)
  endTime: Date;

  @Field(() => ID)
  venueId: string;
}
