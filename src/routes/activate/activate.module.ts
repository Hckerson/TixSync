import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ActivateService } from './activate.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivateController } from './activate.controller';

@Module({
  imports: [AuthModule],
  controllers: [ActivateController],
  providers: [ActivateService, PrismaService],
})
export class ActivateModule {}
