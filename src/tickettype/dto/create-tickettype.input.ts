import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTickettypeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
