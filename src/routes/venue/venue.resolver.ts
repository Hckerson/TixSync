import { VenueService } from './venue.service';
import { Venue } from './entities/venue.entity';
import { EventService } from 'src/event/event.service';
import { Event } from 'src/event/entities/event.entity';
import { CreateVenueInput } from './dto/create-venue.input';
import { UpdateVenueInput } from './dto/update-venue.input';
import { OrganizerService } from 'src/routes/organizer/organizer.service';
import { Organizer } from 'src/routes/organizer/entities/organizer.entity';
import {
  Args,
  Query,
  Resolver,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

@Resolver(() => Venue)
export class VenueResolver {
  constructor(
    private readonly venueService: VenueService,
    private readonly eventService: EventService,
    private readonly organizerService: OrganizerService,
  ) {}

  @Mutation(() => Venue)
  createVenue(@Args('createVenueInput') createVenueInput: CreateVenueInput) {
    return this.venueService.create(createVenueInput);
  }

  @Query(() => [Venue], { name: 'venues' })
  findAll() {
    return this.venueService.findAll();
  }

  @Query(() => Venue, { name: 'venue' })
  findOne(@Args('id') id: string) {
    return this.venueService.findOne(id);
  }

  @Mutation(() => Venue)
  updateVenue(@Args('updateVenueInput') updateVenueInput: UpdateVenueInput) {
    return this.venueService.update(updateVenueInput.id, updateVenueInput);
  }

  @Mutation(() => Venue)
  removeVenue(@Args('id') id: string) {
    return this.venueService.remove(id);
  }

  @ResolveField('organizer', () => [Organizer])
  async getOrganizer(@Parent() venue: Venue) {
    const { id } = venue;
    return this.organizerService.findManyByVenueId(id);
  }

  @ResolveField('event', () => [Event])
  async getEvent(@Parent() venue: Venue) {
    const { id } = venue;
    return this.eventService.findManyByVenueId(id);
  }
}
