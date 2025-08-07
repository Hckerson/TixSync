import { CreateTickettypeInput } from './create-tickettype.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTickettypeInput extends PartialType(CreateTickettypeInput) {
  @Field(() => Int)
  id: number;
}
