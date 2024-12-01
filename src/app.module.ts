import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ResourceModule } from './modules/resource/resource.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { PlaceModule } from './modules/place/place.module';
import { EmailModule } from './modules/email/email.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Load .env variables globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', // Use 'postgres' for PostgreSQL
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true, // Automatically synchronize schema (disable in production)
      }),
    }),
    AppModule,
    AuthModule,
    UserModule,
    CustomerModule,
    PlaceModule,
    ResourceModule,
    ReservationModule,
    EmailModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
