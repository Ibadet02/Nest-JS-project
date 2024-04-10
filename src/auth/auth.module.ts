import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalGuard } from './guards/local.guards';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';

@Module({
  imports:[PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "HHFIhsdirghiahgHSLhgisrrghwhHEhgdihHE",
      signOptions: {expiresIn: '1h'}
    }),
  UsersModule],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService, LocalStrategy, LocalGuard, JwtStrategy]
})
export class AuthModule {}
