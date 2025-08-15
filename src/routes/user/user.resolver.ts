import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { AdminService } from '../admin/admin.service';
import { CreateUserInput } from './dto/create-user.input';
import { AdminGuard } from 'src/guards/roles/admin.guard';
import { UpdateUserInput } from './dto/update-user.input';
import { Admin } from 'src/routes/admin/entities/admin.entity';
import { AudienceService } from 'src/routes/audience/audience.service';
import { Audience } from 'src/routes/audience/entities/audience.entity';
import { OrganizerService } from 'src/routes/organizer/organizer.service';
import { Organizer } from 'src/routes/organizer/entities/organizer.entity';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

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
  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
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
