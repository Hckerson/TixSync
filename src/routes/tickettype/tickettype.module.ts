import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { EventModule } from '../event/event.module';
import { TickettypeService } from './tickettype.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TickettypeResolver } from './tickettype.resolver';
import { EventService } from 'src/routes/event/event.service';
import { TicketService } from 'src/routes/ticket/ticket.service';

@Module({
  imports:[AuthModule, EventModule],
  providers: [
    TickettypeResolver,
    TickettypeService,
    PrismaService,
    TicketService,
  ],
})
export class TickettypeModule {}
