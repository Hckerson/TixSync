import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { EventService } from 'src/routes/event/event.service';
import { Event } from 'src/routes/event/entities/event.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { AudienceService } from 'src/routes/audience/audience.service';
import { TickettypeService } from 'src/routes/tickettype/tickettype.service';
import { TicketType } from 'src/routes/tickettype/entities/tickettype.entity';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Audience } from 'src/routes/audience/entities/audience.entity';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(
    private readonly userService: UserService,
    private readonly eventService: EventService,
    private readonly ticketService: TicketService,
    private readonly audienceService: AudienceService,
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

  @ResolveField('user', () => User)
  async getAudience(@Parent() ticket: Ticket) {
    const { id } = ticket;
    return this.userService.findOneByTicketId(id);
  }
}
