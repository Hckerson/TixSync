import { Module } from '@nestjs/common';
import { GoedataService } from './goedata.service';
import { GoedataResolver } from './goedata.resolver';

@Module({
  providers: [GoedataResolver, GoedataService],
})
export class GoedataModule {}
