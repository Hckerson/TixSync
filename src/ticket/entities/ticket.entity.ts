import { Event } from "src/event/entities/event.entity";
import { ObjectType, Field, ID , InputType} from "@nestjs/graphql";
import { TicketType } from "src/tickettype/entities/tickettype.entity";

@ObjectType()
export  class Ticket {
  @Field((type) => ID)
  id: string;

  @Field()
  eventId: string
  
  @Field(type => TicketType)
  type: TicketType

  @Field()
  qrcode: string

  @Field(type => Boolean)
  isUsed: Boolean

  @Field()
  typeId: string

  @Field(type=> Event)
  event: Event
}
@InputType()
export class InputTicket{
  @Field()
  eventId: string
  
  @Field(type => TicketType)
  type: TicketType

  @Field()
  qrcode: string

  @Field(type => Boolean)
  isUsed: Boolean

  @Field()
  typeId: string

  @Field(type=> Event)
  event: Event
}