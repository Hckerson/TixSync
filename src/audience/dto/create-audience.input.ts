import { Role } from 'src/enums/role.enum';
import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateAudienceInput {
  @Field(() => ID, {nullable: true})
  userId: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  fullname: string;

  @Field(() => Role)
  role: Role;
}
