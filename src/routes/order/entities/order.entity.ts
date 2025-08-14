import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { OrderCategory } from 'src/enums/orderCategory.enum';
import { Payment } from 'src/routes/payment/entities/payment.entity';

@ObjectType()
export class Order {
  @Field((type) => ID)
  id: string;

  @Field((type) => OrderCategory)
  item: OrderCategory;

  @Field((type) => Int)
  total: number;

  @Field((type) => [String])
  itemId: string[];

  @Field((type) => Payment, { nullable: true })
  payment: Payment;
}
