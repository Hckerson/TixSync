import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { VenueService } from 'src/venue/venue.service';
import { Venue } from 'src/venue/entities/venue.entity';
import { TicketService } from 'src/ticket/ticket.service';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { PaymentService } from 'src/payment/payment.service';
import { Payment } from 'src/payment/entities/payment.entity';
import { OrganizerService } from 'src/routes/organizer/organizer.service';
import { TickettypeService } from 'src/tickettype/tickettype.service';
import { Organizer } from 'src/routes/organizer/entities/organizer.entity';
import { TicketType } from 'src/tickettype/entities/tickettype.entity';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

@Resolver(() => Event)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly venueService: VenueService,
    private readonly ticketService: TicketService,
    private readonly paymentService: PaymentService,
    private readonly organizerService: OrganizerService,
    private readonly ticketTypeService: TickettypeService,
  ) {}

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventService.create(createEventInput);
  }

  @Query(() => [Event], { name: 'events' })
  findAll() {
    return this.eventService.findAll();
  }

  @Query(() => Event, { name: 'event' })
  findOne(@Args('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Mutation(() => Event)
  updateEvent(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventService.update(updateEventInput.id, updateEventInput);
  }

  @Mutation(() => Event)
  removeEvent(@Args('id') id: string) {
    return this.eventService.remove(id);
  }

  @ResolveField('organizer', () => Organizer)
  async getOrganizer(@Parent() event: Event) {
    const { id } = event;
    return this.organizerService.findOneByEventId(id);
  }

  @ResolveField('ticketType', () => [TicketType])
  async getTicketType(@Parent() event: Event) {
    const { id } = event;
    return this.ticketTypeService.findManyByEventId(id);
  }

  @ResolveField('ticket', () => [Ticket])
  async getTicket(@Parent() event: Event) {
    const { id } = event;
    return this.ticketService.findManyByEventId(id);
  }

  // @ResolveField('payment', () => Payment)
  // async getPayment(@Parent() event: Event) {
  //   const { id } = event;
  //   return this.paymentService.findOneByEventId(id);
  // }

  @ResolveField('venue', () => Venue)
  async getVenue(@Parent() event: Event) {
    const { id } = event;
    return this.venueService.findOneByEventId(id);
  }
}
