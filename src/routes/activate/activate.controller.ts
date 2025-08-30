import { UseGuards } from '@nestjs/common';
import { ActivateService } from './activate.service';
import { Controller, Get, Param, Req } from '@nestjs/common';
import { OrganizerGuard } from '../auth/Guards/organizer.guard';

@Controller('activate')
export class ActivateController {
  constructor(private readonly activateService: ActivateService) {}

  @Get('ticket/:id')
  @UseGuards(OrganizerGuard)
  activate(
    @Param('id') id: string,
    @Param('eventId') eventId: string,
  ) {
    return this.activateService.activateTicket(id, eventId);
  }
}
