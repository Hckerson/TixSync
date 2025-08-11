import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { CreateEventInput } from 'src/event/dto/create-event.input';
import { CreateOrganizerInput } from 'src/organizer/dto/create-organizer.input';

@InputType()
export class CreateVenueInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  country: string;

  @Field((type) => [CreateOrganizerInput], { nullable: true })
  organizer: CreateOrganizerInput[];

  @Field((type) => [CreateEventInput], { nullable: true })
  event: CreateEventInput[];

  @Field((type) => Int)
  capacity: number;
}
