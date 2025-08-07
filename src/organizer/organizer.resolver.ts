import { EventService } from 'src/event/event.service';
import { VenueService } from 'src/venue/venue.service';
import { OrganizerService } from './organizer.service';
import { Venue } from 'src/venue/entities/venue.entity';
import { Event } from 'src/event/entities/event.entity';
import { Organizer } from './entities/organizer.entity';
import { CreateOrganizerInput } from './dto/create-organizer.input';
import { UpdateOrganizerInput } from './dto/update-organizer.input';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

@Resolver(() => Organizer)
export class OrganizerResolver {
  constructor(
    private readonly venueService: VenueService,
    private readonly eventService: EventService,
    private readonly organizerService: OrganizerService,
  ) {}

  @Mutation(() => Organizer)
  createOrganizer(
    @Args('createOrganizerInput') createOrganizerInput: CreateOrganizerInput,
  ) {
    return this.organizerService.create(createOrganizerInput);
  }

  @Query(() => [Organizer], { name: 'organizer' })
  findAll() {
    return this.organizerService.findAll();
  }

  @Query(() => Organizer, { name: 'organizer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.organizerService.findOne(id);
  }

  @Mutation(() => Organizer)
  updateOrganizer(
    @Args('updateOrganizerInput') updateOrganizerInput: UpdateOrganizerInput,
  ) {
    return this.organizerService.update(
      updateOrganizerInput.id,
      updateOrganizerInput,
    );
  }

  @Mutation(() => Organizer)
  removeOrganizer(@Args('id', { type: () => Int }) id: number) {
    return this.organizerService.remove(id);
  }

  @ResolveField('venue', () => [Venue])
  async getVenues(@Parent() organizer: Organizer) {
    const { id } = organizer;
    return await this.venueService.findMany(+id)
  }

  @ResolveField('event', ()=> [Event])
  async getEvents(@Parent() organizer: Organizer) {
    const {id} = organizer
     return await  this.venueService.findMany(+id)
  }
}
