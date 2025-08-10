import { UserService } from 'src/user/user.service';
import { AudienceService } from './audience.service';
import { Audience } from './entities/audience.entity';
import { CreateAudienceInput } from './dto/create-audience.input';
import { UpdateAudienceInput } from './dto/update-audience.input';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Audience)
export class AudienceResolver {
  constructor(
    private readonly userService: UserService,
    private readonly audienceService: AudienceService,
  ) {}

  @Mutation(() => Audience)
  createAudience(
    @Args('createAudienceInput') createAudienceInput: CreateAudienceInput,
  ) {
    return this.audienceService.create(createAudienceInput);
  }

  @Query(() => [Audience], { name: 'audiences' })
  findAll() {
    return this.audienceService.findAll();
  }

  @Query(() => Audience, { name: 'audience' })
  findOne(@Args('id') id: string) {
    return this.audienceService.findOne(id);
  }

  @Mutation(() => Audience)
  updateAudience(
    @Args('updateAudienceInput') updateAudienceInput: UpdateAudienceInput,
  ) {
    return this.audienceService.update(
      updateAudienceInput.id,
      updateAudienceInput,
    );
  }

  @Mutation(() => Audience)
  removeAudience(@Args('id') id: string) {
    return this.audienceService.remove(id);
  }

  @ResolveField('user', ()=> User)
  async getUser(@Parent() audience: Audience) {
    const {id} = audience
    return this.userService.findOneByAudienceId(id);
  }
}
