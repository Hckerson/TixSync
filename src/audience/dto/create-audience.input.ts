import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAudienceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
