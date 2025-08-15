import { Venue } from 'src/routes/venue/entities/venue.entity';
import { EventCategory } from 'src/enums/eventCategory.enum';
import { Payment } from 'src/routes/payment/entities/payment.entity';
import { CreateOrganizerInput } from 'src/routes/organizer/dto/create-organizer.input';
import { CreateTicketInput } from 'src/routes/ticket/dto/create-ticket.input';
import { CreatePaymentInput } from 'src/routes/payment/dto/create-payment.input';
import { InputType, Int, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { CreateTickettypeInput } from 'src/routes/tickettype/dto/create-tickettype.input';

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

  @Field(() => CreateOrganizerInput, { nullable: true })
  organizer: CreateOrganizerInput;

  @Field(() => GraphQLISODateTime)
  startTime: Date;

  @Field(() => [CreateTickettypeInput], { nullable: true })
  ticketType: CreateTickettypeInput[];

  @Field(() => [CreateTicketInput], { nullable: true })
  ticket: CreateTicketInput[];

  @Field(() => GraphQLISODateTime)
  endTime: Date;

  @Field(() => ID)
  venueId: string;
}
