import { Name } from 'src/enums/name.enum';
import { Ticket } from 'src/models/ticket.model';
import { Event } from 'src/event/entities/event.entity';
import { ObjectType, Field, Int ,ID} from '@nestjs/graphql';

@ObjectType()
export class TicketType {
  @Field((type) => ID)
  id: string;

  @Field((type) => Event)
  event: Event;

  @Field((type) => Name)
  name: Name;

  @Field((type) => Int)
  price: number;

  @Field((type) => [Ticket])
  ticket: Ticket[];

  @Field()
  eventId: string;
}
