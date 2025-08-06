import { CreateOrganizerInput } from './create-organizer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrganizerInput extends PartialType(CreateOrganizerInput) {
  @Field(() => Int)
  id: number;
}
