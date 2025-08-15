import { Module } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueResolver } from './venue.resolver';
import { AuthModule } from '../auth/auth.module';
import { EventModule } from '../event/event.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganizerService } from 'src/routes/organizer/organizer.service';

@Module({
  imports:[EventModule, AuthModule],
  providers: [
    VenueResolver,
    VenueService,
    PrismaService,
    OrganizerService,
  ],
  exports:[VenueService]
})
export class VenueModule {}
