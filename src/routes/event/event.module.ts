import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Mailtrap } from '../auth/service/mailtrap.service';
import { VenueService } from 'src/routes/venue/venue.service';
import { TicketService } from 'src/routes/ticket/ticket.service';
import { OrganizerGuard } from 'src/guards/roles/organizer.guard';
import { PaymentService } from 'src/routes/payment/payment.service';
import { RiskAssesmentService } from 'src/lib/risk-assesment.service';
import { OrganizerService } from 'src/routes/organizer/organizer.service';
import { TickettypeService } from 'src/routes/tickettype/tickettype.service';

@Module({
  providers: [
    Mailtrap,
    AuthService,
    EventService,
    VenueService,
    TicketService,
    EventResolver,
    PrismaService,
    OrganizerGuard,
    PaymentService,
    OrganizerService,
    TickettypeService,
    RiskAssesmentService,
  ],
  exports:[EventService]
})
export class EventModule {}
