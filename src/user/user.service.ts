import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserInput: CreateUserInput) {
    /**
     * Creates a new user
     * @param createUserInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const { organizer, admin, audience, ...rest } = createUserInput;
      const newUser = this.prisma.user.create({
        data: rest,
      });
      if (!newUser) return { message: 'create failed', status: 400 };
      return { message: 'success', status: 200 };
    } catch (error) {
      console.error(`Error creating user: ${error}`);
    }
  }

  async findAll(id: string) {
    /**
     * Returns all user from the db
     * @returns - JSON object containning all user
     */
    try {
      const allUser = await this.prisma.user.findMany();
      if (!allUser) return [];
      return allUser;
    } catch (error) {
      console.error(`Error fetching all user: ${error}`);
    }
  }

  async findOne(id: string) {
    /**
     * Finds and returns an user identified by an id
     * @param id -ID of the user
     */

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) return [];
      return user;
    } catch (error) {
      console.error(`Error fetching user with id ${id}: ${error}`);
    }
  }

  async findOneByOrgId(orgId: string) {
    /**
     * Finds a single user
     * @param orgId -Id of the user
     * @returns JSON object containing found user
     */
    try {
      const user = await this.prisma.user.findMany({
        where: {
          organizer: {
            id: orgId,
          },
        },
      });
      if (!user) return { message: 'fetch failed', data: null };
      return user;
    } catch (error) {
      console.log(`Error fetching user with orgId  ${orgId}: ${error}`);
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    /**
     * Update the existing data of an user
     * @param id -ID of the user
     * @param updateUserInput -New data to be entered
     */
    try {
      const {
        id: orgId,
        organizer,
        admin,
        audience,
        ...rest
      } = updateUserInput;
      const updatedData = await this.prisma.user.update({
        where: {
          id,
        },
        data: rest,
      });
      if (!updatedData) return { message: 'delete failed', status: 400 };
      return { message: 'success', status: 200 };
    } catch (error) {
      console.error(`Error updating orgaizer with id ${id}: ${error}`);
    }
  }

  async remove(id: string) {
    /**
     * Deletes an user
     * @param id -ID of the user
     */
    try {
      const deletedUser = await this.prisma.user.delete({
        where: {
          id,
        },
      });
      if (!deletedUser) return { message: 'delete failed', status: 400 };
      return { message: 'success', status: 200 };
    } catch (error) {
      console.error(`Error deleting user`);
    }
  }
}
