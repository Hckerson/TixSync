import { Role } from 'src/enums/role.enum';
import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { CreateEventInput } from 'src/routes/event/dto/create-event.input';
import { CreateVenueInput } from 'src/routes/venue/dto/create-venue.input';

@InputType()
export class CreateOrganizerInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  fullname: string;

  @Field(() => [CreateEventInput], { nullable: true })
  event: string;

  @Field(() => [CreateVenueInput], { nullable: true })
  venue: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field((type) => Role)
  role: Role;

  @Field({nullable: true})
  userId: string;
}
