import { Module } from '@nestjs/common';
import { UserService } from 'src/routes/user/user.service';
import { OrganizerService } from './organizer.service';
import { VenueService } from 'src/routes/venue/venue.service';
import { EventService } from 'src/routes/event/event.service';
import { OrganizerResolver } from './organizer.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [
    UserService,
    VenueService,
    EventService,
    PrismaService,
    OrganizerService,
    OrganizerResolver,
  ],
})
export class OrganizerModule {}
