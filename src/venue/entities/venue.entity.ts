import { Event } from 'src/event/entities/event.entity';
import { Organizer } from 'src/organizer/entities/organizer.entity';
import { Field, ObjectType, Int , ID, GraphQLISODateTime} from '@nestjs/graphql';

@ObjectType()
export class Venue {
  @Field((type) => ID)
  id: string;

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

  @Field((type) => [Organizer])
  organizer: Organizer[];

  @Field((type) => [Event])
  event: Event[];

  @Field((type) => Int)
  capacity: number;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;
}
