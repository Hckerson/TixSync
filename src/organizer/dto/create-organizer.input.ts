import { Role } from 'src/enums/role.enum';
import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateOrganizerInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  fullname: string;

  @Field()
  venueId: string;

  @Field()
  eventId: string;

  @Field((type) => Role)
  role: Role;

  @Field()
  userId: string;
}
