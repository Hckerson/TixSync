import { UserService } from 'src/routes/user/user.service';
import { User } from 'src/routes/user/entities/user.entity';
import { AudienceService } from './audience.service';
import { Audience } from './entities/audience.entity';
import { TicketService } from 'src/ticket/ticket.service';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { CreateAudienceInput } from './dto/create-audience.input';
import { UpdateAudienceInput } from './dto/update-audience.input';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

@Resolver(() => Audience)
export class AudienceResolver {
  constructor(
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
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

  @ResolveField('user', () => User)
  async getUser(@Parent() audience: Audience) {
    const { id } = audience;
    return this.userService.findOneByAudienceId(id);
  }

  @ResolveField('ticket', () => [Ticket])
  async getTicket(@Parent() audience: Audience) {
    const { id } = audience;
    return this.ticketService.findManyByAudienceId(id);
  }
}
