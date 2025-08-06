import { Field, ObjectType, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  provider: string;

  @Field((type) => Boolean)
  emailVerified: Boolean;

  @Field((type) => Boolean)
  twofaVerified: Boolean;

  @Field({nullable: true})
  verificationToken : string

  @Field({nullable: true})
  speakeasySecret:string

  @Field({nullable: true})
  lastLoginIp :string

  @Field({nullable: true})
  lastKnownDevice :string
}
