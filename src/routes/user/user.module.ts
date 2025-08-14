import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AdminService } from 'src/admin/admin.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AudienceService } from 'src/audience/audience.service';
import { OrganizerService } from 'src/routes/organizer/organizer.service';

@Module({
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
