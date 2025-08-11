import { Event } from 'src/event/entities/event.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Audience } from 'src/audience/entities/audience.entity';
import { TicketType } from 'src/tickettype/entities/tickettype.entity';

@ObjectType()
export class Ticket {
  @Field((type) => ID)
  id: string;

  @Field()
  eventId: string;

  @Field((type) => TicketType)
  type: TicketType;

  @Field()
  qrcode: string;

  @Field((type) => Boolean)
  isUsed: Boolean;

  @Field()
  typeId: string;

  @Field((type) => Event)
  event: Event;

  @Field()
  audienceId: string;

  @Field(()=> Audience)
  audience: Audience
}
