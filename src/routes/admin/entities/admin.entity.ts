import { Role } from 'src/enums/role.enum';
import { User } from 'src/routes/user/entities/user.entity';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Admin {
  @Field((type) => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  fullname: string;

  @Field((type) => Role, { nullable: true })
  role: Role;

  @Field((type) => User, { nullable: true })
  user: User;

  @Field({ nullable: true })
  userId: string;
}
