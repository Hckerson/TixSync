import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminService } from 'src/routes/admin/admin.service';
import { AudienceService } from 'src/routes/audience/audience.service';
import { OrganizerService } from 'src/routes/organizer/organizer.service';

@Module({
  imports: [AuthModule],
  providers: [
    UserResolver,
    UserService,
    PrismaService,
    AudienceService,
    AdminService,
    OrganizerService,
  ],
})
export class UserModule {}
