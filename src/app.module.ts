import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { EventModule } from './event/event.module';
import { OrderModule } from './order/order.module';
import { VenueModule } from './venue/venue.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { TicketModule } from './ticket/ticket.module';
import { SessionModule } from './session/session.module';
import { GoedataModule } from './goedata/goedata.module';
import { PaymentModule } from './payment/payment.module';
import { AudienceModule } from './audience/audience.module';
import { OrganizerModule } from './organizer/organizer.module';
import { TickettypeModule } from './tickettype/tickettype.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

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
      context: ({ req, res }) => ({ req, res }),
      autoSchemaFile:join(process.cwd(), 'src/schema.gql'),
    }),
    AdminModule,
    AudienceModule,
    EventModule,
    GoedataModule,
    OrderModule,
    SessionModule,
    TickettypeModule,
    TicketModule,
    UserModule,
    VenueModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
