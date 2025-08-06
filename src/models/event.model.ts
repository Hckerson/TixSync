import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field()
  title: string;
}
