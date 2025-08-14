import { Role } from 'src/enums/role.enum';
import { User } from 'src/routes/user/entities/user.entity';
import { Event } from 'src/routes/event/entities/event.entity';
import { Venue } from 'src/routes/venue/entities/venue.entity';
import { Field, ObjectType, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Organizer {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  fullname: string;

  @Field((type) => [Venue], { nullable: true })
  venue: Venue[];

  @Field((type) => [Event], { nullable: true })
  event: Event[];

  @Field((type) => Role, { nullable: true })
  role: Role;

  @Field(() => User, { nullable: true })
  user: User;

  @Field((type) => ID, { nullable: true })
  userId: string;
}
