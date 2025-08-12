import { Name } from 'src/enums/name.enum';
import { Event } from 'src/event/entities/event.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { ObjectType, Field, Int, ID, InputType } from '@nestjs/graphql';

@ObjectType()
export class TicketType {
  @Field((type) => ID)
  id: string;

  @Field((type) => Event, { nullable: true })
  event: Event;

  @Field((type) => Name)
  name: Name;

  @Field((type) => Int)
  price: number;

  @Field((type) => [Ticket], { nullable: true })
  ticket: Ticket[];

  @Field({ nullable: true })
  eventId: string;
}
