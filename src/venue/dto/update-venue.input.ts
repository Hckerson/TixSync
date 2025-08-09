import { CreateVenueInput } from './create-venue.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateVenueInput extends PartialType(CreateVenueInput) {
  @Field(() => ID)
  id: string;
}
