import { InputType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { EventCategory } from 'src/enums/eventCategory.enum';

@InputType()
export class EventFilter {
  @Field({ nullable: true })
  title: string;

  @Field(() => EventCategory, { nullable: true })
  category: EventCategory;

  @Field(() => GraphQLISODateTime, { nullable: true })
  startTime: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  endTime: Date;

  @Field({ nullable: true })
  location: string;
}
