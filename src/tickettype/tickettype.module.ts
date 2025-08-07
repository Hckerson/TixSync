import { Module } from '@nestjs/common';
import { TickettypeService } from './tickettype.service';
import { TickettypeResolver } from './tickettype.resolver';

@Module({
  providers: [TickettypeResolver, TickettypeService],
})
export class TickettypeModule {}
