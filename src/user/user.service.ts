import  axios from 'axios';
import * as bcrypt from 'bcryptjs'
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserInput: CreateUserInput) {
    /**
     * Creates a new user
     * @param createUserInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const { organizer, admin, audience, ...rest } = createUserInput;
      try {
        const response = await axios.post("http://localhost:3000/auth/signup", rest);
        var newUser = response.data
      } catch (error) {
        console.error(`Error creating new user via axios: ${error}`);
      }
      // const newUser = await this.prisma.user.create({
      //   data: {
      //     ...rest,
      //     password: await bcrypt.hash(rest.password, 10),
      //   },
      // });
      if(newUser.createdAt){
        newUser.createdAt = new Date(newUser.createdAt)
      }
      if(newUser.updatedAt){
        newUser.updatedAt = new Date(newUser.updatedAt)
      }

      if (!newUser) return [];
      const { id } = newUser;

      if (organizer) {
        try {
          await this.prisma.organizer.create({
            data: {
              ...organizer,
              userId: id,
            },
          });
        } catch (error) {
          console.error(`Error creating new organizer: ${error}`);
        }
      }

      if (admin) {
        try {
          await this.prisma.admin.create({
            data: {
              ...admin,
              userId: id,
            },
          });
        } catch (error) {
          console.error(`Error creating new admin: ${error}`);
        }
      }

      if (audience) {
        try {
          await this.prisma.audience.create({
            data: {
              ...audience,
              userId: id,
            },
          });
        } catch (error) {
          console.error(`Error creating new audience: ${error}`);
        }
      }
      if (!newUser) return [];
      return newUser;
    } catch (error) {
      console.error(`Error creating user: ${error}`);
    }
  }

  async findAll() {
    /**
     * Returns all user from the db
     * @returns - JSON object containning all user
     */
    try {
      const allUser = await this.prisma.user.findMany();
      return allUser.map((user) => {
        const { password, ...rest } = user;
        return rest;
      });
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
      const { password, ...rest } = user;
      return rest;
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
      const user = await this.prisma.user.findFirst({
        where: {
          organizer: {
            id: orgId,
          },
        },
      });
      if (!user) return [];
      const { password, ...rest } = user;
      return rest;
    } catch (error) {
      console.log(`Error fetching user with orgId  ${orgId}: ${error}`);
    }
  }

  async findOneByAdminId(adminId: string) {
    /**
     * Finds a single user
     * @param orgId -Id of the user
     * @returns JSON object containing found user
     */
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          admin: {
            id: adminId,
          },
        },
      });
      if (!user) return [];
      const { password, ...rest } = user;
      return rest;
    } catch (error) {
      console.log(`Error fetching user with admin Id  ${adminId}: ${error}`);
    }
  }

  async findOneByAudienceId(audienceId: string) {
    /**
     * Finds a single user
     * @param audienceId -Id of the user
     * @returns JSON object containing found user
     */
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          audience: {
            id: audienceId,
          },
        },
      });
      if (!user) return [];
      const { password, ...rest } = user;
      return rest;
    } catch (error) {
      console.log(
        `Error fetching user with audience Id  ${audienceId}: ${error}`,
      );
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
        password,
        ...rest
      } = updateUserInput;
      const updatedData = await this.prisma.user.update({
        where: {
          id,
        },
        data: rest,
      });
      if (!updatedData) return [];
      return updatedData;
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
      if (!deletedUser) return [];
      return deletedUser;
    } catch (error) {
      console.error(`Error deleting user`);
    }
  }
}
