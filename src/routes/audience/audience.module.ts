import { Module } from '@nestjs/common';
import { AudienceService } from './audience.service';
import { AudienceResolver } from './audience.resolver';
import { TicketService } from '../ticket/ticket.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/routes/user/user.service';

@Module({
  providers: [
    AudienceResolver,
    AudienceService,
    PrismaService,
    UserService,
    TicketService,
  ],
})
export class AudienceModule {}
