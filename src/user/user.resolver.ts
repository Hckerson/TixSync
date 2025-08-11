import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/entities/admin.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AudienceService } from 'src/audience/audience.service';
import { Audience } from 'src/audience/entities/audience.entity';
import { OrganizerService } from 'src/organizer/organizer.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Organizer } from 'src/organizer/entities/organizer.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly audienceService: AudienceService,
    private readonly organizerService: OrganizerService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }

  @ResolveField('organizer', () => Organizer)
  async getOrganizer(@Parent() user: User) {
    const { id } = user;
    return this.organizerService.findOneByUserId(id);
  }

  @ResolveField('admin', () => Admin)
  async getAdmin(@Parent() user: User) {
    const { id } = user;
    return this.adminService.findOneByUserId(id);
  }

  @ResolveField('audience', () => Audience)
  async getAudience(@Parent() user: User) {
    const { id } = user;
    return this.audienceService.findOneByUserId(id);
  }
}
