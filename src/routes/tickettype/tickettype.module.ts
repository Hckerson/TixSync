import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { EventModule } from '../event/event.module';
import { TicketModule } from '../ticket/ticket.module';
import { TickettypeService } from './tickettype.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TickettypeResolver } from './tickettype.resolver';
import { TicketService } from 'src/routes/ticket/ticket.service';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => EventModule),
    forwardRef(() => TicketModule),
  ],
  providers: [TickettypeResolver, TickettypeService, PrismaService],
  exports: [TickettypeService],
})
export class TickettypeModule {}
