import { InputType, Int, Field } from '@nestjs/graphql';
import { OrderCategory } from 'src/enums/orderCategory.enum';
import { CreatePaymentInput } from 'src/payment/dto/create-payment.input';

@InputType()
export class CreateOrderInput {
  @Field(() => OrderCategory)
  item: OrderCategory;

  @Field(() => Int)
  total: number;

  @Field(() => [String])
  itemId: string[];

  @Field(() => CreatePaymentInput, {nullable: true})
  payment: CreatePaymentInput;
}
