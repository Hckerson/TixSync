import { CreateTickettypeInput } from './create-tickettype.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTickettypeInput extends PartialType(CreateTickettypeInput) {
  @Field(()=> ID)
  id: string;
}
