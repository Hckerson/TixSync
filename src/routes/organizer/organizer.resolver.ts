import { UserService } from 'src/routes/user/user.service';
import { User } from 'src/routes/user/entities/user.entity';
import { EventService } from 'src/routes/event/event.service';
import { VenueService } from 'src/routes/venue/venue.service';
import { OrganizerService } from './organizer.service';
import { Venue } from 'src/routes/venue/entities/venue.entity';
import { Event } from 'src/routes/event/entities/event.entity';
import { Organizer } from './entities/organizer.entity';
import { CreateOrganizerInput } from './dto/create-organizer.input';
import { UpdateOrganizerInput } from './dto/update-organizer.input';
import {
  Args,
  Query,
  Parent,
  Mutation,
  Resolver,
  ResolveField,
} from '@nestjs/graphql';

@Resolver(() => Organizer)
export class OrganizerResolver {
  constructor(
    private readonly userService: UserService,
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

  @Query(() => [Organizer], { name: 'organizers' })
  findAllOrganizer() {
    return this.organizerService.findAll();
  }

  @Query(() => Organizer, { name: 'organizer' })
  findOneOrganizer(@Args('id') id: string) {
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
  removeOrganizer(@Args('id') id: string) {
    return this.organizerService.remove(id);
  }

  @ResolveField('venue', () => [Venue])
  async getVenues(@Parent() organizer: Organizer) {
    const { id } = organizer;
    return await this.venueService.findManyByOrgId(id);
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() organizer: Organizer) {
    const { id } = organizer;
    return await this.userService.findOneByOrgId(id);
  }

  @ResolveField('event', () => [Event])
  async getEvents(@Parent() organizer: Organizer) {
    const { id } = organizer;
    return await this.eventService.findManyByOrgId(id);
  }
}
