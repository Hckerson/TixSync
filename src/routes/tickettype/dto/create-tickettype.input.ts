import { Name } from 'src/enums/name.enum';
import { CreateEventInput } from 'src/routes/event/dto/create-event.input';
import { CreateTicketInput } from 'src/routes/ticket/dto/create-ticket.input';
import { Field, Int, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTickettypeInput {
  @Field((type) => Name)
  name: Name;

  @Field((type) => Int)
  price: number;

  @Field((type) => [CreateTicketInput], { nullable: true })
  ticket: CreateTicketInput[];

  @Field()
  eventId: string;
}
