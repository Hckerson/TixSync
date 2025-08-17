import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TicketService } from './ticket.service';
import { UserModule } from '../user/user.module';
import { TicketResolver } from './ticket.resolver';
import { EventModule } from '../event/event.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AudienceModule } from '../audience/audience.module';
import { TickettypeModule } from '../tickettype/tickettype.module';
import { AudienceService } from 'src/routes/audience/audience.service';

@Module({
  imports: [
    forwardRef(() => EventModule),
    forwardRef(() => UserModule),
    AuthModule,
    TickettypeModule,
    AudienceModule,
  ],
  providers: [TicketService, TicketResolver, PrismaService],
  exports: [TicketService],
})
export class TicketModule {}
