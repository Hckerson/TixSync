import { Admin } from './admin.model';
import { Session } from './session.model';
import { GeoData } from './geoData.model';
import { Audience } from './audience.model';
import { Organizer } from './organizer.model';
import { Field, ObjectType, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

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

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field({ nullable: true })
  verificationToken: string;

  @Field({ nullable: true })
  speakeasySecret: string;

  @Field({ nullable: true })
  lastLoginIp: string;

  @Field({ nullable: true })
  lastKnownDevice: string;

  @Field((type) => Session)
  session: Session[];

  @Field((type) => GeoData, { nullable: true })
  geoData: GeoData[];

  @Field((type) => Organizer, { nullable: true })
  organizer: Organizer[];

  @Field((type) => Admin, { nullable: true })
  admin: Admin[];

  @Field((type) => Audience, { nullable: true })
  audience: Audience[];
}
