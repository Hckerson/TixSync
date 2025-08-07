import { CreateGoedatumInput } from './create-goedatum.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGoedatumInput extends PartialType(CreateGoedatumInput) {
  @Field(() => Int)
  id: number;
}
