import { SeatStatus } from 'src/enums/seat-status.enum';
import {
  ObjectType,
  Field,
  Int,
  ID,
  GraphQLISODateTime,
} from '@nestjs/graphql';

@ObjectType()
export class Seat {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  seatNo: number;

  @Field()
  eventId: string;

  @Field(() => SeatStatus)
  status: SeatStatus;

  @Field()
  typeId: string;

  @Field({ nullable: true })
  row: string;

  @Field({ nullable: true })
  column: string;

  @Field({ nullable: true })
  holdId: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  holdExpiresAt: Date;
}
