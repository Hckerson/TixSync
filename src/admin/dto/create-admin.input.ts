import { Role } from 'src/enums/role.enum';

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAdminInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  fullname: string;

  @Field(() => Role)
  role: Role;

  @Field({nullable: true})
  userId: string;
}
