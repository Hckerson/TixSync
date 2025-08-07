import { CreateVenueInput } from './create-venue.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVenueInput extends PartialType(CreateVenueInput) {
  @Field(() => Int)
  id: number;
}
