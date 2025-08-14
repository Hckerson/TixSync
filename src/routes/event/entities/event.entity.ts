import { Venue } from 'src/routes/venue/entities/venue.entity';
import { Ticket } from 'src/routes/ticket/entities/ticket.entity';
import { Field, ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { EventCategory } from 'src/enums/eventCategory.enum';
import { Payment } from 'src/routes/payment/entities/payment.entity';
import { Organizer } from 'src/routes/organizer/entities/organizer.entity';
import { TicketType } from 'src/routes/tickettype/entities/tickettype.entity';

@ObjectType()
export class Event {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field((type) => EventCategory)
  category: EventCategory;

  @Field((type) => ID, {nullable: true})
  organizerId: string;

  @Field((type) => Organizer, { nullable: true })
  organizer: Organizer;

  @Field((type) => GraphQLISODateTime)
  startTime: Date;

  @Field((type) => [TicketType], { nullable: true })
  ticketType: TicketType[];

  @Field((type) => [Ticket], { nullable: true })
  ticket: Ticket[];

  @Field((type) => Date)
  endTime: Date;

  @Field((type) => ID, {nullable: true})
  venueId: string;

  @Field((type) => Venue, { nullable: true })
  venue: Venue;
}
