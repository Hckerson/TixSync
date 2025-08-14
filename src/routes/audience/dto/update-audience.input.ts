import { CreateAudienceInput } from './create-audience.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAudienceInput extends PartialType(CreateAudienceInput) {
  @Field(() => ID)
  id: string;
}
