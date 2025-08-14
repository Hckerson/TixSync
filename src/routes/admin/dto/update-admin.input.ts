import { CreateAdminInput } from './create-admin.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAdminInput extends PartialType(CreateAdminInput) {
  @Field(()=> ID)
  id: string;
}
