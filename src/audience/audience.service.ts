import { Role } from 'src/enums/role.enum';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAudienceInput } from './dto/create-audience.input';
import { UpdateAudienceInput } from './dto/update-audience.input';

@Injectable()
export class AudienceService {
  constructor(private readonly prisma: PrismaService) {}
  create(createAudienceInput: CreateAudienceInput) {
       /**
     * Creates a new audience
     * @param createaudienceInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
       try {
        const newAudience = this.prisma.audience.create({
          data: createAudienceInput,
        });
        if (!newAudience) return { message: 'create failed', status: 400 };
        return { message: 'success', status: 200 };
      } catch (error) {
        console.error(`Error creating audience: ${error}`);
      }
  }

  async findAll() {
    /**
     * Returns all audience from the db
     * @returns - JSON object containning all audience
     */
    try {
      const allAudience = await this.prisma.audience.findMany();
      if (!allAudience) return [];
      return allAudience.map((audience) => ({
        ...audience,
        role: Role[audience.role as keyof typeof Role], // This converts "AUDIENCE" string to Role.AUDIENCE enum
      }));
    } catch (error) {
      console.error(`Error fetching all audience: ${error}`);
    }
  }

  async findOne(id: string) {
    /**
     * Finds and returns an audience identified by an id
     * @param id -ID of the audience
     */

    try {
      const audience = await this.prisma.audience.findUnique({
        where: {
          id,
        },
      });
      if (!audience) return [];
      return audience;
    } catch (error) {
      console.error(`Error fetching audience with id ${id}: ${error}`);
    }
  }

  async findOneByUserId(userId: string) {
    /**
     * Finds a single user
     * @param userId -Id of the user
     * @returns JSON object containing found user
     */
    try {
      const user = await this.prisma.audience.findFirst({
        where: {
          user: {
            id: userId,
          },
        },
      });
      if (!user) return { message: 'fetch failed', data: null };
      return user;
    } catch (error) {
      console.log(`Error fetching audience with user Id  ${userId}: ${error}`);
    }
  }

  async findOneByTicketId(ticketId: string) {
    /**
     * Finds a single audience
     * @param audienceId -Id of the audience
     * @returns JSON object containing found audience
     */
    try {
      const audience = await this.prisma.audience.findFirst({
        where: {
          ticket:{
            some:{
              id: ticketId
            }
          }
        },
      });
      if (!audience) return [];
      return audience;
    } catch (error) {
      console.log(`Error fetching audience with ticket Id  ${ticketId}: ${error}`);
    }
  }

  async update(id: string, updateAudienceInput: UpdateAudienceInput) {
    /**
     * Update the existing data of an audience
     * @param id -ID of the audience
     * @param updateAudienceInput -New data to be entered
     */
    try {
      const { id: orgId, role, ...rest } = updateAudienceInput;
      const updatedData = await this.prisma.audience.update({
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
      console.error(`Error updating audience with id ${id}: ${error}`);
    }
  }

  async remove(id: string) {
    /**
     * Deletes an audience
     * @param id -ID of the audience
     */
    try {
      const deletedAudience = await this.prisma.audience.delete({
        where: {
          id,
        },
      });
      if (!deletedAudience) return { message: 'delete failed', status: 400 };
      return { message: 'success', status: 200 };
    } catch (error) {
      console.error(`Error deleting audience`);
    }
  }
}
