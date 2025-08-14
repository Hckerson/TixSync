import { Module } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueResolver } from './venue.resolver';
import { EventService } from 'src/event/event.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganizerService } from 'src/routes/organizer/organizer.service';

@Module({
  providers: [
    VenueResolver,
    VenueService,
    PrismaService,
    EventService,
    OrganizerService,
  ],
})
export class VenueModule {}
