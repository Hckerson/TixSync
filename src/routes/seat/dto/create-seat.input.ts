import { InputType, Int, Field } from '@nestjs/graphql';
import { SeatStatus } from 'src/enums/seat-status.enum';

@InputType()
export class CreateSeatInput {
  @Field(() => Int)
  seatNo: number;

  @Field()
  eventId: string;

  @Field(() => SeatStatus)
  status: SeatStatus;

  @Field()
  typeId: string;

  @Field({ nullable: true })
  row?: string;

  @Field({ nullable: true })
  column?: string;

  @Field({ nullable: true })
  holdId?: string;

  @Field({ nullable: true })
  holdExpiresAt?: string;
}
