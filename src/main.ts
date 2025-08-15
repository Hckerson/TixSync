import 'dotenv/config'
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


declare const module: any;
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const isProd = process.env.NODE_ENV === 'production'
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
    credentials: true,
    secure: isProd
    
  })
  app.use(cookieParser(process.env.COOKIE_SECRET))
    const config = new DocumentBuilder()
    .setTitle('TixSync API')
    .setDescription('The authentication endpoints')                                                               
    .setVersion('1.0')
    .addCookieAuth('sessionId') // optional
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
