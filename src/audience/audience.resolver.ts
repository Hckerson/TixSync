import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AudienceService } from './audience.service';
import { Audience } from './entities/audience.entity';
import { CreateAudienceInput } from './dto/create-audience.input';
import { UpdateAudienceInput } from './dto/update-audience.input';

@Resolver(() => Audience)
export class AudienceResolver {
  constructor(private readonly audienceService: AudienceService) {}

  @Mutation(() => Audience)
  createAudience(@Args('createAudienceInput') createAudienceInput: CreateAudienceInput) {
    return this.audienceService.create(createAudienceInput);
  }

  @Query(() => [Audience], { name: 'audience' })
  findAll() {
    return this.audienceService.findAll();
  }

  @Query(() => Audience, { name: 'audience' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.audienceService.findOne(id);
  }

  @Mutation(() => Audience)
  updateAudience(@Args('updateAudienceInput') updateAudienceInput: UpdateAudienceInput) {
    return this.audienceService.update(updateAudienceInput.id, updateAudienceInput);
  }

  @Mutation(() => Audience)
  removeAudience(@Args('id', { type: () => Int }) id: number) {
    return this.audienceService.remove(id);
  }
}
