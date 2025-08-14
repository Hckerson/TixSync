import { User } from 'src/routes/user/entities/user.entity';
import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class Session {
  @Field((type) => ID)
  id: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  rememberToken: string;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;

  @Field((type) => User)
  user: User;
}
