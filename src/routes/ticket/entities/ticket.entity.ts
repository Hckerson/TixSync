import { Event } from 'src/routes/event/entities/event.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Audience } from 'src/routes/audience/entities/audience.entity';
import { TicketType } from 'src/routes/tickettype/entities/tickettype.entity';

@ObjectType()
export class Ticket {
  @Field((type) => ID)
  id: string;

  @Field({ nullable: true })
  eventId: string;

  @Field((type) => TicketType, { nullable: true })
  type: TicketType;

  @Field()
  qrcode: string;

  @Field((type) => Boolean)
  isUsed: Boolean;

  @Field()
  typeId: string;

  @Field((type) => Event, { nullable: true })
  event: Event;

  @Field({ nullable: true })
  audienceId: string;

  @Field(() => Audience, { nullable: true })
  audience: Audience;
}
