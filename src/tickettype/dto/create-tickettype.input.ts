import { Name } from 'src/enums/name.enum';
import { CreateEventInput } from 'src/event/dto/create-event.input';
import { CreateTicketInput } from 'src/ticket/dto/create-ticket.input';
import { Field, Int ,ID, InputType, } from '@nestjs/graphql';

@InputType()
export class CreateTickettypeInput {
  @Field((type) => CreateEventInput)
  event: CreateEventInput;

  @Field((type) => Name)
  name: Name;

  @Field((type) => Int)
  price: number;

  @Field((type) => [CreateTicketInput])
  ticket: CreateTicketInput[];

  @Field()
  eventId: string;
}
