import { Module } from '@nestjs/common';
import { EventService } from 'src/event/event.service';
import { TickettypeService } from './tickettype.service';
import { TicketService } from 'src/ticket/ticket.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TickettypeResolver } from './tickettype.resolver';

@Module({
  providers: [
    TickettypeResolver,
    TickettypeService,
    PrismaService,
    EventService,
    TicketService,
  ],
})
export class TickettypeModule {}
