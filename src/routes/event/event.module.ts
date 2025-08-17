import { Module , forwardRef} from '@nestjs/common';
import { EventService } from './event.service';
import { AuthModule } from '../auth/auth.module';
import { EventResolver } from './event.resolver';
import { VenueModule } from '../venue/venue.module';
import { TicketModule } from '../ticket/ticket.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { Mailtrap } from '../auth/service/mailtrap.service';
import { OrganizerModule } from '../organizer/organizer.module';
import { OrganizerGuard } from 'src/guards/roles/organizer.guard';
import { TickettypeModule } from '../tickettype/tickettype.module';
import { RiskAssesmentService } from 'src/lib/risk-assesment.service';

@Module({
  imports: [
    AuthModule,
    VenueModule,
    forwardRef(() => TicketModule),
    forwardRef(() => TickettypeModule),
    forwardRef(() => OrganizerModule),
  ],
  providers: [
    EventService,
    EventResolver,
    Mailtrap,
    PrismaService,
    OrganizerGuard,
    RiskAssesmentService,
  ],
  exports: [EventService],
})
export class EventModule {}
