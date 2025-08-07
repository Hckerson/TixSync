import { Role } from 'src/enums/role.enum';
import { User } from 'src/models/user.model';
import { Venue } from 'src/models/venue.model';
import { Event } from 'src/models/event.model';
import { Field, ObjectType, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Organizer {
  @Field((type) => ID)
  id: string;
  
  @Field()
  username: string;

  @Field({ nullable: true })
  fullname: string;

  @Field(type=> [Venue])
  venue: Venue[];

  @Field(type => [Event])
  event: Event[];

  @Field((type) => Role)
  role: Role;

  @Field()
  user: User;

  @Field((type) => ID)
  userId: number;
}
