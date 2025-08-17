import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { AudienceService } from './audience.service';
import { AudienceResolver } from './audience.resolver';
import { TicketModule } from '../ticket/ticket.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/routes/user/user.service';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => UserModule),
    forwardRef(() => TicketModule),
  ],
  providers: [AudienceResolver, AudienceService, PrismaService, UserService],
  exports: [AudienceService],
})
export class AudienceModule {}
