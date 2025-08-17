import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivateService {
  /**
   * Activates a ticket
   * @param prisma -Service for interacting with database
   */
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  async activateTicket(ticketId: string, eventId: string) {
    /**
     * Activates a ticket if it has not already been activated
     * @param ticketId -Id of the ticket
     */

    try {
      //check if used
      const ticket = await this.prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
      });
      if (!ticket) throw new Error('Ticket does not exist');

      const { isUsed } = ticket;

      if (isUsed)
        return { message: 'Ticket has already been used', status: 400 };

      //validate ownership

      //check if it is for the right event

      if(eventId !== ticket.eventId) return {message: "Ticket does not belong to this event", status: 400}

      const updatedTicket = await this.prisma.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          isUsed: true,
        },
      });
      if (!updatedTicket) throw new Error('Ticket could not be activated');

      return { message: 'activated', status: 200 };
    } catch (error) {
      console.error(`Error activating ticket`);
    }
  }
}
