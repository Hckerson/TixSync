import { Role } from 'src/enums/role.enum';
import { User } from 'src/user/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';
import { Venue } from 'src/venue/entities/venue.entity';
import { Field, ObjectType, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Organizer {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  fullname: string;

  @Field((type) => [Venue])
  venue: Venue[];

  @Field((type) => [Event])
  event: Event[];

  @Field((type) => Role)
  role: Role;

  @Field(()=> User)
  user: User;

  @Field((type) => ID)
  userId: string;
}
