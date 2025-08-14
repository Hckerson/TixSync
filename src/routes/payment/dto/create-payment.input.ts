import { Status } from 'src/enums/status.enum';
import { ObjectType,InputType, Field, Int, ID, GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreatePaymentInput {
  @Field((type) => Int)
  amount: number;

  @Field()
  orderId: string;

  @Field((type) => Status)
  status: Status;
}
