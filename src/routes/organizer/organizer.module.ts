import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { EventModule } from '../event/event.module';
import { VenueModule } from '../venue/venue.module';
import { OrganizerService } from './organizer.service';
import { OrganizerResolver } from './organizer.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/routes/user/user.service';
import { VenueService } from 'src/routes/venue/venue.service';
import { EventService } from 'src/routes/event/event.service';

@Module({
  imports: [AuthModule, EventModule, VenueModule],
  providers: [
    UserService,
    PrismaService,
    OrganizerService,
    OrganizerResolver,
  ],
  exports:[OrganizerService]
})
export class OrganizerModule {}
