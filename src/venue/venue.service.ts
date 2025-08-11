import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVenueInput } from './dto/create-venue.input';
import { UpdateVenueInput } from './dto/update-venue.input';

@Injectable()
export class VenueService {
  constructor(private readonly prisma: PrismaService) {}
  create(createVenueInput: CreateVenueInput) {
    /**
     * Creates a new venue
     * @param createVenueInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const { organizer, event, ...rest } = createVenueInput;
      const newVenue = this.prisma.venue.create({
        data: rest,
      });
      if (!newVenue) return [];
      return newVenue;
    } catch (error) {
      console.error(`Error creating venue: ${error}`);
    }
  }

  async findAll() {
    /**
     * Returns all venue from the db
     * @returns - JSON object containning all venue
     */
    try {
      const allVenue = await this.prisma.venue.findMany();
      if (!allVenue) return [];
      return allVenue;
    } catch (error) {
      console.error(`Error fetching all venue: ${error}`);
    }
  }

  async findManyByOrgId(organizerId: string) {
    /**
     * Finds all the venues whose organizer id is matches the one provided
     * @param organizerId -ID of the organizer
     * @returns JSON object containning all the events
     */
    try {
      const allEvents = await this.prisma.venue.findMany({
        where: {
          organizer: {
            some: {
              organizerId,
            },
          },
        },
      });
      if (!allEvents) return [];
      return allEvents;
    } catch (error) {
      console.error(
        `Error fetching venue with organizer id : ${organizerId}: ${error}`,
      );
    }
  }

  async findOneByEventId(eventId: string) {
    /**
     * Finds a single user
     * @param eventId -Id of the user
     * @returns JSON object containing found user
     */
    try {
      const user = await this.prisma.venue.findFirst({
        where: {
          event: {
            some: {
              id: eventId,
            },
          },
        },
      });
      if (!user) return [];
      return user;
    } catch (error) {
      console.log(`Error fetching venue with event Id  ${eventId}: ${error}`);
    }
  }

  async findOne(id: string) {
    /**
     * Finds and returns an venue identified by an id
     * @param id -ID of the venue
     */

    try {
      const venue = await this.prisma.venue.findUnique({
        where: {
          id,
        },
      });
      if (!venue) return [];
      return venue;
    } catch (error) {
      console.error(`Error fetching venue with id ${id}: ${error}`);
    }
  }

  async update(id: string, updateVenueInput: UpdateVenueInput) {
    /**
     * Update the existing data of an venue
     * @param id -ID of the venue
     * @param updateVenueInput -New data to be entered
     */
    try {
      const { id: orgId, event, organizer, ...rest } = updateVenueInput;
      const updatedData = await this.prisma.venue.update({
        where: {
          id,
        },
        data: rest,
      });
      if (!updatedData) return [];
      return updatedData;
    } catch (error) {
      console.error(`Error updating venue with id ${id}: ${error}`);
    }
  }

  async remove(id: string) {
    /**
     * Deletes an venue
     * @param id -ID of the venue
     */
    try {
      const deletedVenue = await this.prisma.venue.delete({
        where: {
          id,
        },
      });
      if (!deletedVenue) return [];
      return deletedVenue;
    } catch (error) {
      console.error(`Error deleting venue`);
    }
  }
}
