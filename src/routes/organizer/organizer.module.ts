import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { EventModule } from '../event/event.module';
import { VenueModule } from '../venue/venue.module';
import { OrganizerService } from './organizer.service';
import { OrganizerResolver } from './organizer.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => EventModule),
    forwardRef(() => VenueModule),
    forwardRef(() => UserModule),
  ],
  providers: [PrismaService, OrganizerService, OrganizerResolver],
  exports: [OrganizerService],
})
export class OrganizerModule {}
