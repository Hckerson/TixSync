import { Admin } from 'src/admin/entities/admin.entity';
import { Session } from 'src/session/entities/session.entity';
import { GeoData } from 'src/goedata/entities/goedatum.entity';
import { Audience } from 'src/audience/entities/audience.entity';
import { Organizer } from 'src/organizer/entities/organizer.entity';
import { Field, ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';

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

  @Field((type) => [Session])
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
