import { CreatePaymentInput } from './create-payment.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePaymentInput extends PartialType(CreatePaymentInput) {
  @Field(()=> ID)
  id: string;
}
