import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TokenStrategy } from './strategies/accessToken.strategies';

@Module({
  providers: [
    AuthResolver, 
    AuthService, 
    JwtService, 
    PrismaService,
    TokenStrategy
  ]
})
export class AuthModule {}
