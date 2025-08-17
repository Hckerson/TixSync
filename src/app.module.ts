import { join } from 'path';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './routes/user/user.module';
import { AuthModule } from './routes/auth/auth.module';
import { OrderModule } from './routes/order/order.module';
import { VenueModule } from './routes/venue/venue.module';
import { AdminModule } from './routes/admin/admin.module';
import { EventModule } from './routes/event/event.module';
import { TicketModule } from './routes/ticket/ticket.module';
import { PaymentModule } from './routes/payment/payment.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AudienceModule } from './routes/audience/audience.module';
import { OrganizerModule } from './routes/organizer/organizer.module';
import { GqlThrottlerGuard } from './routes/auth/throttler/gql-throttle';
import { TickettypeModule } from './routes/tickettype/tickettype.module';
import { SeatModule } from './routes/seat/seat.module';
import { PaystackModule } from './routes/paystack/paystack.module';
import { ActivateModule } from './routes/activate/activate.module';

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
    OrderModule,
    UserModule,
    VenueModule,
    PaymentModule,
    TickettypeModule,
    TicketModule,
    SeatModule,
    PaystackModule,
    ActivateModule,
  ],
  controllers: [AppController],
  providers: [AppService,     {
    provide: APP_GUARD,
    useClass: GqlThrottlerGuard,
  }],
})
export class AppModule {}
