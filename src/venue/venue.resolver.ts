import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VenueService } from './venue.service';
import { Venue } from './entities/venue.entity';
import { CreateVenueInput } from './dto/create-venue.input';
import { UpdateVenueInput } from './dto/update-venue.input';

@Resolver(() => Venue)
export class VenueResolver {
  constructor(private readonly venueService: VenueService) {}

  @Mutation(() => Venue)
  createVenue(@Args('createVenueInput') createVenueInput: CreateVenueInput) {
    return this.venueService.create(createVenueInput);
  }

  @Query(() => [Venue], { name: 'venue' })
  findAll() {
    return this.venueService.findAll();
  }

  @Query(() => Venue, { name: 'venue' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.venueService.findOne(id);
  }

  @Mutation(() => Venue)
  updateVenue(@Args('updateVenueInput') updateVenueInput: UpdateVenueInput) {
    return this.venueService.update(updateVenueInput.id, updateVenueInput);
  }

  @Mutation(() => Venue)
  removeVenue(@Args('id', { type: () => Int }) id: number) {
    return this.venueService.remove(id);
  }
}
