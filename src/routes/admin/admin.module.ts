import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthModule } from '../auth/auth.module';
import { AdminResolver } from './admin.resolver';
import { UserModule } from '../user/user.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [AuthModule, forwardRef(() => UserModule)],
  providers: [AdminResolver, AdminService, PrismaService],
  exports: [AdminService],
})
export class AdminModule {}
