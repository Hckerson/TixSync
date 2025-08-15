import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { EventFilter } from './dto/event-filter.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';

@Injectable()
export class EventService {
  /**
   * Interface for interacting with event related actions e.g(creation, deletion, update etc)
   * @param prisma -Service for interacting with database
   * @param authService -Service for authenticating users
   */
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}
  async create(createEventInput: CreateEventInput, req: Request) {
    /**
     * Creates a new event
     * @param createeventInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const cookie = req.cookies['sessionToken'];
      const payload = (await this.authService.decrypt(cookie)).payload;
      const { id } = payload;
      if (!id) {
        return null;
      } else {
        try {
          const orgInfo = await this.prisma.user.findUnique({
            where: {
              id: id as string,
            },
            include: {
              organizer: true,
            },
          });
          if (!orgInfo?.organizer) return null;
          const { id: organizerId } = orgInfo.organizer;
          const { organizer, ticketType, ticket, ...rest } = createEventInput;
          const newEvent = await this.prisma.event.create({
            data: {
              ...rest,
              organizerId
            },

          });
          if (!newEvent) return null;
          return newEvent;
        } catch (error) {
          console.error(`Error fetching  organizer id: ${error}`);
        }
      }
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
      return allEvent;
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
      if (!event) return null;
      return event;
    } catch (error) {
      console.error(`Error fetching event with id ${id}: ${error}`);
    }
  }

  async filterEvent(eventFilter: EventFilter) {
    /**
     * Filter event based on the filter requirement sent by the user
     * @param eventFilter -Data to be filtered
     */
    let data: any = {};
    if (eventFilter.title) {
      data.title = eventFilter.title;
    }
    if (eventFilter.category) {
      data.category = eventFilter.category;
    }
    if (eventFilter.startTime || eventFilter.endTime) {
      if (eventFilter.startTime) {
        data.startTime = {
          gte: eventFilter.startTime,
        };
      }
      if (eventFilter.endTime) {
        data.endTime = {
          lte: eventFilter.endTime,
        };
      }
    }

    let venue: any = {};
    if (eventFilter.location) {
      venue.city = eventFilter.location;
    }

    if (Object.keys(venue).length > 0) {
      data.venue = venue;
    }

    try {
      const filteredEvent = await this.prisma.event.findMany({
        where: data,
      });
      if (!filteredEvent) return [];
      return filteredEvent;
    } catch (error) {
      console.error(`Error fetching filtered event data: ${error}`);
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

      if (!event) return null;
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
          venueId,
        },
      });
      if (!allVenues) return [];
      return allVenues;
    } catch (error) {
      console.error(`Error finding venues with venue id ${venueId}: ${error}`);
    }
  }

  async findOneByTicketTypeId(typeId: string) {
    /**
     * Finds a single user
     * @param typeId -Id of the user
     * @returns JSON object containing found user
     */
    try {
      const user = await this.prisma.event.findFirst({
        where: {
          ticketType: {
            some: {
              id: typeId,
            },
          },
        },
      });
      if (!user) return null;
      return user;
    } catch (error) {
      console.error(
        `Error fetching event  with ticktType  Id  ${typeId}: ${error}`,
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

  // async findOneByPaymentId(paymentId: string) {
  //   /**
  //    * Finds all the events whose payment id is matches the one provided
  //    * @param paymentId -ID of the payment
  //    * @returns JSON object containning all the events
  //    */
  //   try {
  //     const allEvents = await this.prisma.event.findFirst({
  //       where: {
  //         payment:{
  //           some:{
  //             id: paymentId
  //           }
  //         },
  //       },
  //     });
  //     if (!allEvents) return [];
  //     return allEvents;
  //   } catch (error) {
  //     console.error(
  //       `Error fetching event with payment id : ${paymentId}: ${error}`,
  //     );
  //   }
  // }

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
      if (!updatedData) return null;
      return updatedData;
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
      if (!deletedEvent) return null;
      return deletedEvent;
    } catch (error) {
      console.error(`Error deleting event`);
    }
  }
}
