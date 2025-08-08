import { Module } from '@nestjs/common';
import { AudienceService } from './audience.service';
import { AudienceResolver } from './audience.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AudienceResolver, AudienceService, PrismaService],
})
export class AudienceModule {}
