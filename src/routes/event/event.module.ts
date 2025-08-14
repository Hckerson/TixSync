import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { VenueService } from 'src/routes/venue/venue.service';
import { TicketService } from 'src/routes/ticket/ticket.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentService } from 'src/routes/payment/payment.service';
import { OrganizerService } from 'src/routes/organizer/organizer.service';
import { TickettypeService } from 'src/routes/tickettype/tickettype.service';

@Module({
  providers: [
    EventResolver,
    EventService,
    PrismaService,
    VenueService,
    TicketService,
    PaymentService,
    OrganizerService,
    TickettypeService,
  ],
})
export class EventModule {}
