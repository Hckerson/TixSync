import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { EventService } from 'src/routes/event/event.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AudienceService } from 'src/routes/audience/audience.service';
import { TickettypeService } from 'src/routes/tickettype/tickettype.service';

@Module({
  providers: [
    EventService,
    TicketService,
    PrismaService,
    TicketResolver,
    AudienceService,
    TickettypeService,
  ],
})
export class TicketModule {}
