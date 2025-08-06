import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { OrganizerModule } from './organizer/organizer.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    OrganizerModule,
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      graphiql:true,
      sortSchema:true,
      driver: ApolloDriver,
      autoSchemaFile:join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
