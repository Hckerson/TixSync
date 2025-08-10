import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { EventService } from 'src/event/event.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TickettypeService } from 'src/tickettype/tickettype.service';

@Module({
  providers: [
    TicketResolver,
    TicketService,
    PrismaService,
    EventService,
    TickettypeService,
  ],
})
export class TicketModule {}
