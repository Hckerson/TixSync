import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Venue } from './venue.model';
import { Event } from './event.model';
import { Role } from 'src/enums/role.enum';
import { User } from './user.model';

@ObjectType()
export class Organizer {
  @Field()
  username: string;

  @Field({ nullable: true })
  fullname: string;

  @Field()
  venue: Venue[];

  @Field()
  event: Event[];

  @Field((type) => Role)
  role: Role;

  @Field()
  user: User;

  @Field((type) => Int)
  userId: number;
}
