import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReserveSeatInput {
  @Field(() => [String])
  seatIds: string[];

  @Field()
  eventId: string;

  @Field()
  userId: string;
}
