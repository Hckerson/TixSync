import { Module, forwardRef } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueResolver } from './venue.resolver';
import { AuthModule } from '../auth/auth.module';
import { EventModule } from '../event/event.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganizerModule } from '../organizer/organizer.module';

@Module({
  imports: [
    forwardRef(() => EventModule),
    forwardRef(() => OrganizerModule),
    AuthModule,
  ],
  providers: [VenueResolver, VenueService, PrismaService],
  exports: [VenueService],
})
export class VenueModule {}
