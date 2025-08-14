import { EventService } from 'src/routes/event/event.service';
import { Event } from 'src/routes/event/entities/event.entity';
import { TickettypeService } from './tickettype.service';
import { TicketType } from './entities/tickettype.entity';
import { TicketService } from 'src/routes/ticket/ticket.service';
import { Ticket } from 'src/routes/ticket/entities/ticket.entity';
import { CreateTickettypeInput } from './dto/create-tickettype.input';
import { UpdateTickettypeInput } from './dto/update-tickettype.input';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';

@Resolver(() => TicketType)
export class TickettypeResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly ticketService: TicketService,
    private readonly  tickettypeService: TickettypeService,
  ) {}

  @Mutation(() => TicketType)
  createTickettype(
    @Args('createTickettypeInput') createTickettypeInput: CreateTickettypeInput,
  ) {
    return this.tickettypeService.create(createTickettypeInput);
  }

  @Query(() => [TicketType], { name: 'tickettypes' })
  findAll() {
    return this.tickettypeService.findAll();
  }

  @Query(() => TicketType, { name: 'tickettype' })
  findOne(@Args('id') id: string) {
    return this.tickettypeService.findOne(id);
  }

  @Mutation(() => TicketType)
  updateTickettype(
    @Args('updateTickettypeInput') updateTickettypeInput: UpdateTickettypeInput,
  ) {
    return this.tickettypeService.update(
      updateTickettypeInput.id,
      updateTickettypeInput,
    );
  }

  @Mutation(() => TicketType)
  removeTickettype(@Args('id') id: string) {
    return this.tickettypeService.remove(id);
  }

  @ResolveField('event', () => Event)
  getEvent(@Parent() tickettype: TicketType) {
    const {id} = tickettype
    return this.eventService.findOneByTicketTypeId(id);
  }

  @ResolveField('ticket', () => [Ticket])
  getTickets(@Parent() tickettype: TicketType) {
    const {id} = tickettype
    return this.ticketService.findManyByTicketTypeId(id);
  }
}
