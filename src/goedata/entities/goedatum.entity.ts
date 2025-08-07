import { User } from 'src/models/user.model';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class GeoData {
  @Field((type) => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  country: string;

  @Field()
  region: string;

  @Field()
  timezone: string;

  @Field()
  city: string;

  @Field((type) => User)
  user: User;
}
