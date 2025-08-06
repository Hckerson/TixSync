import { Organizer } from './organizer.model';
import { Event } from './event.model';
import { Field, ObjectType, Int , ID} from '@nestjs/graphql';

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
}
