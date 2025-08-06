import { Event } from "./event.model";
import { TicketType } from "./ticketType.model";
import { ObjectType, Field, ID } from "@nestjs/graphql";

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