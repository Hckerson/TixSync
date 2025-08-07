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

  @Field((type) => Int)
  eventId: number;

  @Field((type) => Role)
  role: Role;

  @Field((type) => ID)
  userId: number;
}
