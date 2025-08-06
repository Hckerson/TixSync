import { Module } from '@nestjs/common';
import { OrganizerService } from './organizer.service';
import { OrganizerResolver } from './organizer.resolver';

@Module({
  providers: [OrganizerResolver, OrganizerService],
})
export class OrganizerModule {}
