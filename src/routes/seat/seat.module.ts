import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatResolver } from './seat.resolver';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[AuthModule],
  providers: [SeatResolver, SeatService, PrismaService],
})
export class SeatModule {}
