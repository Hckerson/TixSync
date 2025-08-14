import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTicketInput: CreateTicketInput) {
    /**
     * Creates a new ticket
     * @param createTicketInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const newTicket = this.prisma.ticket.create({
        data: createTicketInput,
      });
      if (!newTicket) return null;
      return newTicket;
    } catch (error) {
      console.error(`Error creating ticket: ${error}`);
    }
  }

  async findAll() {
    /**
     * Returns all tickets from the db
     * @returns - JSON object containning all tickets
     */
    try {
      const allTickets = await this.prisma.ticket.findMany();
      if (!allTickets) return [];
      return allTickets.map((ticket) => ({
        ...ticket,
      }));
    } catch (error) {
      console.error(`Error fetching all tickets: ${error}`);
    }
  }

  async findOne(id: string) {
    /**
     * Finds and returns an ticket identified by an id
     * @param id -ID of the ticket
     */

    try {
      const ticket = await this.prisma.ticket.findUnique({
        where: {
          id,
        },
      });
      if (!ticket) return null;
      return ticket;
    } catch (error) {
      console.error(`Error fetching ticket with id ${id}: ${error}`);
    }
  }

  async findManyByEventId(eventId: string) {
    /**
     * Finds a single ticket
     * @param eventId -Id of the ticket
     * @returns JSON object containing found ticket
     */
    try {
      const ticket = await this.prisma.ticket.findMany({
        where: {
          event: {
            id: eventId,
          },
        },
      });
      if (!ticket) return [];
      return ticket;
    } catch (error) {
      console.log(`Error fetching ticket with event Id  ${eventId}: ${error}`);
    }
  }

  async findManyByTicketTypeId(typeId: string) {
    /**
     * Finds a single ticket
     * @param typeId -Id of the ticket
     * @returns JSON object containing found ticket
     */
    try {
      const ticket = await this.prisma.ticket.findMany({
        where: {
          type: {
            id: typeId,
          },
        },
      });
      if (!ticket) return [];
      return ticket;
    } catch (error) {
      console.log(`Error fetching ticket with type Id  ${typeId}: ${error}`);
    }
  }

  async findManyByAudienceId(audienceId: string) {
    /**
     * Finds a single ticket
     * @param audienceId -Id of the ticket
     * @returns JSON object containing found ticket
     */
    try {
      const ticket = await this.prisma.ticket.findMany({
        where: {
          audienceId: audienceId,
        },
      });
      if (!ticket) return [];
      return ticket;
    } catch (error) {
      console.log(
        `Error fetching ticket with audience Id  ${audienceId}: ${error}`,
      );
    }
  }

  async update(id: string, updateTicketInput: UpdateTicketInput) {
    /**
     * Update the existing data of an ticket
     * @param id -ID of the ticket
     * @param updateTicketInput -New data to be entered
     */
    try {
      const { id: orgId, eventId, typeId, ...rest } = updateTicketInput;
      const updatedData = await this.prisma.ticket.update({
        where: {
          id,
        },
        data: rest,
      });
      if (!updatedData) return null;
      return updatedData;
    } catch (error) {
      console.error(`Error updating ticket with id ${id}: ${error}`);
    }
  }

  async remove(id: string) {
    /**
     * Deletes an ticket
     * @param id -ID of the ticket
     */
    try {
      const deletedTicket = await this.prisma.ticket.delete({
        where: {
          id,
        },
      });
      if (!deletedTicket) return null;
      return deletedTicket;
    } catch (error) {
      console.error(`Error deleting ticket`);
    }
  }
}
