import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('jwtSecretKey'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
    PassportModule,
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, ConfigService, JwtStrategy],
})
export class AuthModule {}
