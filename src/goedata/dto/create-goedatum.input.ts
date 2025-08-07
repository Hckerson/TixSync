import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGoedatumInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
