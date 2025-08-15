import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthModule } from '../auth/auth.module';
import { AdminResolver } from './admin.resolver';
import { UserService } from 'src/routes/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports:[AuthModule],
  providers: [AdminResolver, AdminService, UserService, PrismaService],
})
export class AdminModule {}
