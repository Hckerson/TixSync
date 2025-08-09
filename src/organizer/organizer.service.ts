import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganizerInput } from './dto/create-organizer.input';
import { UpdateOrganizerInput } from './dto/update-organizer.input';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class OrganizerService {
  constructor(private readonly prisma: PrismaService) {}
  create(createOrganizerInput: CreateOrganizerInput) {
    /**
     * Creates a new organizer
     * @param createOrganizerInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const newOrganizer = this.prisma.organizer.create({
        data: createOrganizerInput,
      });
      if (!newOrganizer) return { message: 'create failed', status: 400 };
      return { message: 'success', status: 200 };
    } catch (error) {
      console.error(`Error creating organizer: ${error}`);
    }
  }

  async findAll() {
    /**
     * Returns all organizers from the db
     * @returns - JSON object containning all organizers
     */
    try {
      const allOrganizers = await this.prisma.organizer.findMany();
      if (!allOrganizers) return [];
      return allOrganizers.map((organizer) => ({
        ...organizer,
        role: Role[organizer.role as keyof typeof Role], // This converts "ORGANIZER" string to Role.ORGANIZER enum
      }));
    } catch (error) {
      console.error(`Error fetching all organizers: ${error}`);
    }
  }

  async findManyByVenueId(venueId: string) {
    /**
     * Find all organizer whose venue id matches the venue id provided
     * @param organizerId -ID of the organizer
     * @return JSON object containning all  the venues found
     */

    try {
      const allVenues = await this.prisma.organizer.findMany({
        where: {
          venues: {
            some: {
              venueId,
            },
          },
        },
      });
      if (!allVenues) return [];
      return allVenues;
    } catch (error) {
      console.error(
        `Error finding venues with organizer id ${venueId}: ${error}`,
      );
    }
  }

  async findOne(id: string) {
    /**
     * Finds and returns an organizer identified by an id
     * @param id -ID of the organizer
     */

    try {
      const organizer = await this.prisma.organizer.findUnique({
        where: {
          id,
        },
      });
      if (!organizer) return [];
      return organizer;
    } catch (error) {
      console.error(`Error fetching organizer with id ${id}: ${error}`);
    }
  }

  async update(id: string, updateOrganizerInput: UpdateOrganizerInput) {
    /**
     * Update the existing data of an organizer
     * @param id -ID of the organizer
     * @param updateOrganizerInput -New data to be entered
     */
    try {
      const { id: orgId, userId, ...rest } = updateOrganizerInput;
      const updatedData = await this.prisma.organizer.update({
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
     * Deletes an organizer
     * @param id -ID of the organizer
     */
    try {
      const deletedOrganizer = await this.prisma.organizer.delete({
        where: {
          id,
        },
      });
      if (!deletedOrganizer) return { message: 'delete failed', status: 400 };
      return { message: 'success', status: 200 };
    } catch (error) {
      console.error(`Error deleting organizer`);
    }
  }
}
