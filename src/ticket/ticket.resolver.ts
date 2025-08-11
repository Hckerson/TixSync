import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';
import { EventService } from 'src/event/event.service';
import { Event } from 'src/event/entities/event.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { TickettypeService } from 'src/tickettype/tickettype.service';
import { TicketType } from 'src/tickettype/entities/tickettype.entity';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly ticketService: TicketService,
    private readonly ticketTypeService: TickettypeService,
  ) {}

  @Mutation(() => Ticket)
  createTicket(
    @Args('createTicketInput') createTicketInput: CreateTicketInput,
  ) {
    return this.ticketService.create(createTicketInput);
  }

  @Query(() => [Ticket], { name: 'tickets' })
  findAll() {
    return this.ticketService.findAll();
  }

  @Query(() => Ticket, { name: 'ticket' })
  findOne(@Args('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Mutation(() => Ticket)
  updateTicket(
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput,
  ) {
    return this.ticketService.update(updateTicketInput.id, updateTicketInput);
  }

  @Mutation(() => Ticket)
  removeTicket(@Args('id') id: string) {
    return this.ticketService.remove(id);
  }

  @ResolveField('event', () => Event)
  async getEvent(@Parent() ticket: Ticket) {
    const { id } = ticket;
    return this.eventService.findOneByTicketId(id);
  }

  @ResolveField('type', () => TicketType)
  async getTicketType(@Parent() ticket: Ticket) {
    const { id } = ticket;
    return this.ticketTypeService.findOneByTicketId(id);
  } 
}
