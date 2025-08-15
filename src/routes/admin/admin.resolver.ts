import { UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { AdminGuard } from 'src/guards/roles/admin.guard';
import { UserService } from 'src/routes/user/user.service';
import { User } from 'src/routes/user/entities/user.entity';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @UseGuards(AdminGuard)
  @Query(() => [Admin], { name: 'admins' })
  findAll() {
    return this.adminService.findAll();
  }

  @Query(() => Admin, { name: 'admin' })
  findOne(@Args('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Mutation(() => Admin)
  updateAdmin(@Args('updateAdminInput') updateAdminInput: UpdateAdminInput) {
    return this.adminService.update(updateAdminInput.id, updateAdminInput);
  }

  @UseGuards(AdminGuard)
  @Mutation(() => Admin)
  removeAdmin(@Args('id') id: string) {
    return this.adminService.remove(id);
  }

  @ResolveField('user', () => User)
  async getUser(@Parent() admin: Admin) {
    const { id } = admin;
    return this.userService.findOneByAdminId(id);
  }
}
