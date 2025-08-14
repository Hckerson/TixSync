import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
  @Field()
  eventId: string

  @Field()
  qrcode: string

  @Field(type => Boolean)
  isUsed: boolean

  @Field()
  typeId: string

}
