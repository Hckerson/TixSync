import { Name } from 'src/enums/name.enum';
import { CreateEventInput } from 'src/routes/event/dto/create-event.input';
import { CreateTicketInput } from 'src/routes/ticket/dto/create-ticket.input';
import { Field, Int, InputType } from '@nestjs/graphql';
import { CreateVenueInput } from 'src/routes/venue/dto/create-venue.input';

@InputType()
export class CreateTickettypeInput {
  @Field((type) => Name)
  name: Name;

  @Field(() => CreateVenueInput, { nullable: true })
  event: CreateEventInput;

  @Field((type) => Int)
  price: number;


  @Field(() => Int)
  qty: number;

  @Field((type) => [CreateTicketInput], { nullable: true })
  ticket: CreateTicketInput[];

  @Field({ nullable: true })
  eventId: string;
}
