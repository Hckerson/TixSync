import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { EventModule } from '../event/event.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventService } from 'src/routes/event/event.service';
import { AudienceService } from 'src/routes/audience/audience.service';
import { TickettypeService } from 'src/routes/tickettype/tickettype.service';

@Module({
  imports:[AuthModule, EventModule],
  providers: [
    TicketService,
    PrismaService,
    TicketResolver,
    AudienceService,
    TickettypeService,
  ],
})
export class TicketModule {}
