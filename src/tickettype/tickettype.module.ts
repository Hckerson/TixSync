import { Module } from '@nestjs/common';
import { TickettypeService } from './tickettype.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TickettypeResolver } from './tickettype.resolver';

@Module({
  providers: [TickettypeResolver, TickettypeService, PrismaService],
})
export class TickettypeModule {}
