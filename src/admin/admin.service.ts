import { Injectable } from '@nestjs/common';
import { Role } from 'src/enums/role.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdminInput } from './dto/create-admin.input';
import { UpdateAdminInput } from './dto/update-admin.input';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  create(createAdminInput: CreateAdminInput) {
    /**
     * Creates a new admin
     * @param createAdminInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const newAdmin = this.prisma.admin.create({
        data: createAdminInput,
      });
      if (!newAdmin) return [];
      return newAdmin ;
    } catch (error) {
      console.error(`Error creating admin: ${error}`);
    }
  }

  async findAll() {
      /**
     * Returns all admin from the db
     * @returns - JSON object containning all admin
     */
      try {
        const allAdmin = await this.prisma.admin.findMany();
        if (!allAdmin) return [];
        return allAdmin.map((admin) => ({
          ...admin,
          role: Role[admin.role as keyof typeof Role], // This converts "ADMIN" string to Role.ADMIN enum
        }));
      } catch (error) {
        console.error(`Error fetching all admin: ${error}`);
      }
  }

  async findOne(id: string) {
    /**
     * Finds and returns an admin identified by an id
     * @param id -ID of the admin
     */

    try {
      const admin = await this.prisma.admin.findUnique({
        where: {
          id,
        },
      });
      if (!admin) return [];
      return admin;
    } catch (error) {
      console.error(`Error fetching admin with id ${id}: ${error}`);
    }
  }

  async findOneByUserId(userId: string) {
    /**
     * Finds a single user
     * @param userId -Id of the user
     * @returns JSON object containing found user
     */
    try {
      const user = await this.prisma.admin.findFirst({
        where: {
          user: {
            id: userId,
          },
        },
      });
      if (!user) return { message: 'fetch failed', data: null };
      return user;
    } catch (error) {
      console.log(`Error fetching admin with user Id  ${userId}: ${error}`);
    }
  }

  async update(id: string, updateAdminInput: UpdateAdminInput) {
    /**
     * Update the existing data of an admin
     * @param id -ID of the admin
     * @param updateadminInput -New data to be entered
     */
    try {
      const { id: orgId, userId, role, ...rest } = updateAdminInput;
      const updatedData = await this.prisma.admin.update({
        where: {
          id,
        },
        data: {
          ...rest,
          role: role,
        },
      });
      if (!updatedData) return { message: 'delete failed', status: 400 };
      return { message: 'success', status: 200 };
    } catch (error) {
      console.error(`Error updating admin with id ${id}: ${error}`);
    }
  }

  async remove(id: string) {
    /**
     * Deletes an admin
     * @param id -ID of the admin
     */
    try {
      const deletedAdmin = await this.prisma.admin.delete({
        where: {
          id,
        },
      });
      if (!deletedAdmin) return { message: 'delete failed', status: 400 };
      return { message: 'success', status: 200 };
    } catch (error) {
      console.error(`Error deleting admin`);
    }
  }
}
