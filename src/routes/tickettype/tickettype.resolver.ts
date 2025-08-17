import { forwardRef, Inject, UseGuards } from '@nestjs/common';
import { TickettypeService } from './tickettype.service';
import { TicketType } from './entities/tickettype.entity';
import { EventService } from 'src/routes/event/event.service';
import { Event } from 'src/routes/event/entities/event.entity';
import { TicketService } from 'src/routes/ticket/ticket.service';
import { Ticket } from 'src/routes/ticket/entities/ticket.entity';
import { OrganizerGuard } from 'src/guards/roles/organizer.guard';
import { CreateTickettypeInput } from './dto/create-tickettype.input';
import { UpdateTickettypeInput } from './dto/update-tickettype.input';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

@Resolver(() => TicketType)
export class TickettypeResolver {
  constructor(
    @Inject(forwardRef(() => EventService))
    private readonly eventService: EventService,
    private readonly ticketService: TicketService,
    private readonly tickettypeService: TickettypeService,
  ) {}

  @UseGuards(OrganizerGuard)
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

  @UseGuards(OrganizerGuard)
  @Mutation(() => TicketType)
  updateTickettype(
    @Args('updateTickettypeInput') updateTickettypeInput: UpdateTickettypeInput,
  ) {
    return this.tickettypeService.update(
      updateTickettypeInput.id,
      updateTickettypeInput,
    );
  }

  @UseGuards(OrganizerGuard)
  @Mutation(() => TicketType)
  removeTickettype(@Args('id') id: string) {
    return this.tickettypeService.remove(id);
  }

  @ResolveField('event', () => Event)
  getEvent(@Parent() tickettype: TicketType) {
    const { id } = tickettype;
    return this.eventService.findOneByTicketTypeId(id);
  }

  @ResolveField('ticket', () => [Ticket])
  getTickets(@Parent() tickettype: TicketType) {
    const { id } = tickettype;
    return this.ticketService.findManyByTicketTypeId(id);
  }
}
