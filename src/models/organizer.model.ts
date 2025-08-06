import { Field, ObjectType, Int, ID } from '@nestjs/graphql';
import { Venue } from './venue.model';
import { Event } from './event.model';
import { Role } from 'src/enums/role.enum';
import { User } from './user.model';

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
