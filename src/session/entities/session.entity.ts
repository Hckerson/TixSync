import { User } from 'src/models/user.model';
import { ObjectType, Field , ID} from '@nestjs/graphql';

@ObjectType()
export class Session {
  @Field((type) => ID)
  id: string;

  @Field()
  userId: string;

  @Field({ nullable: true })
  rememberToken: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => User)
  user: User;
}
