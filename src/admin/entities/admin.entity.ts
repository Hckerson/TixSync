import { Role } from 'src/enums/role.enum';
import { User } from 'src/models/user.model';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Admin {
  @Field((type) => ID)
  id: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  fullname: string;

  @Field((type) => Role)
  role: Role;

  @Field((type) => User)
  user: User;

  @Field()
  userId: string;
}
