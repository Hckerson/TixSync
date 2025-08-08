import { CreateOrganizerInput } from './create-organizer.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateOrganizerInput extends PartialType(CreateOrganizerInput) {
  @Field(()=> ID)
  id: string;
}
