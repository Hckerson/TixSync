import { InputType, Field } from '@nestjs/graphql';
import { CreateAdminInput } from 'src/admin/dto/create-admin.input';
import { CreateAudienceInput } from 'src/audience/dto/create-audience.input';
import { CreateOrganizerInput } from 'src/organizer/dto/create-organizer.input';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field((type) => CreateOrganizerInput, { nullable: true })
  organizer: CreateOrganizerInput;

  @Field((type) => CreateAdminInput, { nullable: true })
  admin: CreateAdminInput;

  @Field((type) => CreateAudienceInput, { nullable: true })
  audience: CreateAudienceInput;
}
