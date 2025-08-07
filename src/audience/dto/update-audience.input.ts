import { CreateAudienceInput } from './create-audience.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAudienceInput extends PartialType(CreateAudienceInput) {
  @Field(() => Int)
  id: number;
}
