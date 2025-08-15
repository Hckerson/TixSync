import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AudienceService } from './audience.service';
import { AudienceResolver } from './audience.resolver';
import { TicketService } from '../ticket/ticket.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/routes/user/user.service';

@Module({
  imports:[AuthModule],
  providers: [
    AudienceResolver,
    AudienceService,
    PrismaService,
    UserService,
    TicketService,
  ],
})
export class AudienceModule {}
