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
import { AdminModule } from './admin/admin.module';
import { AudienceModule } from './audience/audience.module';
import { EventModule } from './event/event.module';
import { GoedataModule } from './goedata/goedata.module';
import { OrderModule } from './order/order.module';
import { SessionModule } from './session/session.module';
import { TickettypeModule } from './tickettype/tickettype.module';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import { VenueModule } from './venue/venue.module';
import { PaymentModule } from './payment/payment.module';

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
