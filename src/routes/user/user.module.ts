import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { TicketModule } from '../ticket/ticket.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AudienceModule } from '../audience/audience.module';
import { OrganizerModule } from '../organizer/organizer.module';

@Module({
  imports: [
    AuthModule,
    AdminModule,
    AudienceModule,
    OrganizerModule,
    forwardRef(() => TicketModule),
  ],
  providers: [UserResolver, UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
