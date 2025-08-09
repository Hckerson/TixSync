import { TickettypeService } from './tickettype.service';
import { TicketType } from './entities/tickettype.entity';
import { CreateTickettypeInput } from './dto/create-tickettype.input';
import { UpdateTickettypeInput } from './dto/update-tickettype.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver(() => TicketType)
export class TickettypeResolver {
  constructor(private readonly tickettypeService: TickettypeService) {}

  @Mutation(() => TicketType)
  createTickettype(@Args('createTickettypeInput') createTickettypeInput: CreateTickettypeInput) {
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

  @Mutation(() => TicketType)
  updateTickettype(@Args('updateTickettypeInput') updateTickettypeInput: UpdateTickettypeInput) {
    return this.tickettypeService.update(updateTickettypeInput.id, updateTickettypeInput);
  }

  @Mutation(() => TicketType)
  removeTickettype(@Args('id') id: string) {
    return this.tickettypeService.remove(id);
  }
}
