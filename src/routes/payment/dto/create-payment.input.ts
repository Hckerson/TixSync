import { Status } from 'src/enums/status.enum';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field((type) => Int)
  amount: number;

  @Field({ nullable: true })
  orderId: string;

  @Field()
  userId: string;

  @Field((type) => Status)
  status: Status;
}
