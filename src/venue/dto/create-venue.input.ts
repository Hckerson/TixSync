import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVenueInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
