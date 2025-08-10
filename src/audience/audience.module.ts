import { Module } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AudienceService } from './audience.service';
import { AudienceResolver } from './audience.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AudienceResolver, AudienceService, PrismaService, UserService],
})
export class AudienceModule {}
