import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
  @Field()
  eventId: string

  @Field()
  qrcode: string

  @Field()
  seatId: string

  @Field()
  userId: string

  @Field(()=> Int)
  seatNo: number
  
  @Field(type => Boolean)
  isUsed: boolean

  @Field()
  typeId: string

}
