import { Venue } from './venue.model';
import { Ticket } from './ticket.model';
import { Payment } from './payment.model';
import { Organizer } from './organizer.model';
import { TicketType } from './ticketType.model';
import { Field, ObjectType, Int, ID } from '@nestjs/graphql';
import { EventCategory } from 'src/enums/eventCategory.enum';

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

  @Field((type) => ID)
  organizerId: string;

  @Field((type) => Organizer)
  organizer: Organizer;

  @Field((type) => Date)
  startTime: Date;

  @Field((type) => TicketType)
  ticketType: TicketType[];

  @Field((type) => Ticket)
  ticket: Ticket[];

  @Field((type) => Payment)
  payment: Payment[];

  @Field((type) => Date)
  endTime: Date;

  @Field((type) => ID)
  venueId: string;

  @Field((type) => Venue)
  venue: Venue;
}
