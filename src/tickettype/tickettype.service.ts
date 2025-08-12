import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTickettypeInput } from './dto/create-tickettype.input';
import { UpdateTickettypeInput } from './dto/update-tickettype.input';

@Injectable()
export class TickettypeService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTicketTypeInput: CreateTickettypeInput) {
    /**
     * Creates a new ticketType
     * @param createTicketTypetypeInput -Data to be entered
     * @returns -JSON object containing success/failure status
     */
    try {
      const { ticket,  ...rest } = createTicketTypeInput;
      const newticketType = this.prisma.ticketType.create({
        data: rest,
      });
      if (!newticketType) return [];
      return newticketType;
    } catch (error) {
      console.error(`Error creating ticketType: ${error}`);
    }
  }

  async findAll() {
    /**
     * Returns all ticketType from the db
     * @returns - JSON object containning all ticketType
     */
    try {
      const allTicketType = await this.prisma.ticketType.findMany();
      if (!allTicketType) return [];
      console.log(allTicketType)
      return allTicketType;
    } catch (error) {
      console.error(`Error fetching all ticketType: ${error}`);
    }
  }

  async findOne(id: string) {
    /**
     * Finds and returns an ticketType identified by an id
     * @param id -ID of the ticketType
     */

    try {
      const ticketType = await this.prisma.ticketType.findUnique({
        where: {
          id,
        },
      });
      if (!ticketType) return [];
      return ticketType;
    } catch (error) {
      console.error(`Error fetching ticketType with id ${id}: ${error}`);
    }
  }

  
  async findManyByEventId(eventId: string) {
    /**
     * Finds a single ticketType
     * @param eventId -Id of the ticketType
     * @returns JSON object containing found ticketType
     */
    try {
      const ticketType = await this.prisma.ticketType.findMany({
        where: {
          event: {
              id : eventId
          },
        },
      });

      if (!ticketType) return [];
      return ticketType;
    } catch (error) {
      console.log(`Error fetching ticketType with event Id  ${eventId}: ${error}`);
    }
  }

  async findOneByTicketId(ticketId: string) {
    /**
     * Finds and returns a ticketType identified by a ticket id
     * @param id -ID of the ticket
     * @returns JSON object containg the ticketType
     */

    try {
      const ticketType = await this.prisma.ticketType.findFirst({
        where: {
          ticket: {
            some: { id: ticketId },
          },
        },
      });

      if (!ticketType) return [];
      return ticketType;
    } catch (error) {
      console.error(`Error fetching ticketType with id ${ticketId}: ${error}`);
    }
  }

  async update(id: string, updateTickettypeInput: UpdateTickettypeInput) {
    /**
     * Update the existing data of an ticketType
     * @param id -ID of the ticketType
     * @param updateTickettypeInput -New data to be entered
     */
    try {
      const { id: orgId, ticket, ...rest } = updateTickettypeInput;
      const updatedData = await this.prisma.ticketType.update({
        where: {
          id,
        },
        data: rest,
      });
      if (!updatedData) return [];
      return updatedData;
    } catch (error) {
      console.error(`Error updating ticketType with id ${id}: ${error}`);
    }
  }

  async remove(id: string) {
    /**
     * Deletes an ticketType
     * @param id -ID of the ticketType
     */
    try {
      const deletedTicketType = await this.prisma.ticketType.delete({
        where: {
          id,
        },
      });
      if (!deletedTicketType) return [];
      return deletedTicketType;
    } catch (error) {
      console.error(`Error deleting ticketType`);
    }
  }
}
