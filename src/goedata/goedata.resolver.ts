import { GoedataService } from './goedata.service';
import { GeoData } from './entities/goedatum.entity';
import { CreateGoedatumInput } from './dto/create-goedatum.input';
import { UpdateGoedatumInput } from './dto/update-goedatum.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

@Resolver(() => GeoData)
export class GoedataResolver {
  constructor(private readonly goedataService: GoedataService) {}

  @Mutation(() => GeoData)
  createGoedatum(@Args('createGoedatumInput') createGoedatumInput: CreateGoedatumInput) {
    return this.goedataService.create(createGoedatumInput);
  }

  @Query(() => [GeoData], { name: 'goedata' })
  findAll() {
    return this.goedataService.findAll();
  }

  @Query(() => GeoData, { name: 'goedatum' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.goedataService.findOne(id);
  }

  @Mutation(() => GeoData)
  updateGoedatum(@Args('updateGoedatumInput') updateGoedatumInput: UpdateGoedatumInput) {
    return this.goedataService.update(updateGoedatumInput.id, updateGoedatumInput);
  }

  @Mutation(() => GeoData)
  removeGoedatum(@Args('id', { type: () => Int }) id: number) {
    return this.goedataService.remove(id);
  }
}
