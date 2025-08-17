import { Admin } from 'src/routes/admin/entities/admin.entity';
import { Audience } from 'src/routes/audience/entities/audience.entity';
import { Organizer } from 'src/routes/organizer/entities/organizer.entity';
import { Field, ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  provider: string;
  

  @Field((type) => Boolean)
  emailVerified: Boolean;

  @Field((type) => Boolean)
  twofaVerified: Boolean;

  @Field((type) => GraphQLISODateTime)
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  updatedAt: Date;

  @Field({ nullable: true })
  verificationToken: string;

  @Field({ nullable: true })
  speakeasySecret: string;

  @Field({ nullable: true })
  lastLoginIp: string;

  @Field({ nullable: true })
  lastKnownDevice: string;

  @Field((type) => Organizer, { nullable: true })
  organizer: Organizer;

  @Field((type) => Admin, { nullable: true })
  admin: Admin;

  @Field((type) => Audience, { nullable: true })
  audience: Audience;
}
