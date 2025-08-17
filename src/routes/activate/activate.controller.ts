import { Request } from 'express';
import { ActivateService } from './activate.service';
import { Controller, Get, Param, Req } from '@nestjs/common';

@Controller('activate')
export class ActivateController {
  constructor(private readonly activateService: ActivateService) {}

  @Get('ticket/:id')
  activate(
    @Param('id') id: string,
    @Param('eventId') eventId: string,
  ) {
    return this.activateService.activateTicket(id, eventId);
  }
}
