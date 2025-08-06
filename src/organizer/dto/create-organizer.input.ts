import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrganizerInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
