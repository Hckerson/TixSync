import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { OrganizerService } from './organizer.service';
import { Organizer } from './entities/organizer.entity';
import { CreateOrganizerInput } from './dto/create-organizer.input';
import { UpdateOrganizerInput } from './dto/update-organizer.input';
import { Venue } from 'src/models/venue.model';

@Resolver(() => Organizer)
export class OrganizerResolver {
  constructor(private readonly organizerService: OrganizerService) {}

  @Mutation(() => Organizer)
  createOrganizer(@Args('createOrganizerInput') createOrganizerInput: CreateOrganizerInput) {
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
  updateOrganizer(@Args('updateOrganizerInput') updateOrganizerInput: UpdateOrganizerInput) {
    return this.organizerService.update(updateOrganizerInput.id, updateOrganizerInput);
  }

  @Mutation(() => Organizer)
  removeOrganizer(@Args('id', { type: () => Int }) id: number) {
    return this.organizerService.remove(id);
  }

  @ResolveField('venue', ()=> [Venue])
  async getVenue(@Parent() organizer:Organizer){
    const  {id} = organizer
  }
}
