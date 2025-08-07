import { Module } from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { VenueService } from 'src/venue/venue.service';
import { EventService } from 'src/event/event.service';
import { OrganizerResolver } from './organizer.resolver';

@Module({
  providers: [OrganizerResolver, OrganizerService, VenueService, EventService],
})
export class OrganizerModule {}
