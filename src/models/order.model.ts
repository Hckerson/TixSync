import { Payment } from './payment.model';
import { ObjectType, Field, Int , ID} from '@nestjs/graphql';
import { OrderCategory } from 'src/enums/orderCategory.enum';

@ObjectType()
export class Order {
  @Field((type) => ID)
  id: string;

  @Field((type) => OrderCategory)
  item: OrderCategory;

  @Field((type) => Int)
  total: number;

  @Field()
  itemId: string[];

  @Field((type) => Payment)
  payment: Payment;
}
