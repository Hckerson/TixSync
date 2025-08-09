import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}
  create(createEventInput: CreateEventInput) {
    /**
     * Creates a new event
     * @param createeventInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const newEvent = this.prisma.event.createMany({
        data: createEventInput,
      });
      if (!newEvent) return { message: 'create failed', status: 400 };
      return { message: 'success', status: 200 };
    } catch (error) {
      console.error(`Error creating event: ${error}`);
    }
  }

  async findAll() {
    /**
     * Returns all event from the db
     * @returns - JSON object containning all event
     */
    try {
      const allEvent = await this.prisma.event.findMany();
      if (!allEvent) return [];
      return allEvent.map((event) => ({
        ...event,
      }));
    } catch (error) {
      console.error(`Error fetching all event: ${error}`);
    }
  }

  async findOne(id: string) {
    /**
     * Finds and returns an event identified by an id
     * @param id -ID of the event
     */

    try {
      const event = await this.prisma.event.findUnique({
        where: {
          id,
        },
      });
      if (!event) return [];
      return event;
    } catch (error) {
      console.error(`Error fetching event with id ${id}: ${error}`);
    }
  }

  async findOneByTicketId(ticketId: string) {
    /**
     * Finds and returns an event identified by a ticket id
     * @param id -ID of the event
     * @returns JSON object containg the event
     */

    try {
      const event = await this.prisma.event.findFirst({
        where: {
          ticket: {
            some: { id: ticketId },
          },
        },
      });
      if (!event) return [];
      return event;
    } catch (error) {
      console.error(`Error fetching event with id ${ticketId}: ${error}`);
    }
  }

  async findManyByVenueId(venueId: string) {
    /**
     * Find all event whose venue id matches the venue id provided
     * @param venueId -ID of the venue
     * @return JSON object containning all  the venues found
     */

    try {
      const allVenues = await this.prisma.event.findMany({
        where: {
          venueId
        },
      });
      if (!allVenues) return [];
      return allVenues;
    } catch (error) {
      console.error(
        `Error finding venues with venue id ${venueId}: ${error}`,
      );
    }
  }

  async findManyByOrgId(organizerId: string) {
    /**
     * Finds all the events whose organizer id is matches the one provided
     * @param organizerId -ID of the organizer
     * @returns JSON object containning all the events
     */
    try {
      const allEvents = await this.prisma.event.findMany({
        where: {
          organizerId,
        },
      });
      if (!allEvents) return [];
      return allEvents;
    } catch (error) {
      console.error(
        `Error fetching event with organizer id : ${organizerId}: ${error}`,
      );
    }
  }

  async update(id: string, updateEventInput: UpdateEventInput) {
    /**
     * Update the existing data of an event
     * @param id -ID of the event
     * @param updateeventInput -New data to be entered
     */
    try {
      const {
        id: orgId,
        organizerId,
        organizer,
        ticketType,
        ticket,
        payment,
        venueId,
        ...rest
      } = updateEventInput;
      const updatedData = await this.prisma.event.update({
        where: {
          id,
        },
        data: {
          ...rest,
        },
      });
      if (!updatedData) return { message: 'delete failed', status: 400 };
      return { message: 'success', status: 200 };
    } catch (error) {
      console.error(`Error updating event with id ${id}: ${error}`);
    }
  }

  async remove(id: string) {
    /**
     * Deletes an event
     * @param id -ID of the event
     */
    try {
      const deletedEvent = await this.prisma.event.delete({
        where: {
          id,
        },
      });
      if (!deletedEvent) return { message: 'delete failed', status: 400 };
      return { message: 'success', status: 200 };
    } catch (error) {
      console.error(`Error deleting event`);
    }
  }
}
