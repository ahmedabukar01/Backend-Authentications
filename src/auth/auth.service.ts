import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import * as argon from 'argon2'
import { SignInInput } from './dto/sign-in-input';
import { ForbiddenError } from 'apollo-server-express';
import { timeStamp } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private Prisma: PrismaService, 
    private jwt: JwtService,
    private configServices: ConfigService
    ){}

  async signup(signUpInput: SignUpInput) {
    const hashedPassword = await argon.hash(signUpInput.password)
    const user = await this.Prisma.user.create({
      data: {
        ...signUpInput,
        password: hashedPassword
      }
    })

    const {accessToken, refreshToken} = await this.createTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, refreshToken);
    return {accessToken, refreshToken, user}
  }

  async signIn(signInInput: SignInInput) {
    const user = await this.Prisma.user.findUnique({where: {email: signInInput.email}});

    if(!user){
      throw new ForbiddenError('Access Denied');
    }

    const isPasswordsMatch = await argon.verify(user.password, signInInput.password);
    
    if(!isPasswordsMatch){
      throw new ForbiddenError('Password did not match')
    }

    const {accessToken, refreshToken} = await this.createTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, refreshToken);

    return {accessToken, refreshToken, user}
  }

  findAll() {
    return this.Prisma.user.findMany();
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  async logout(id: string) {
    await this.Prisma.user.updateMany({
      where: {
        id: id,
        refreshToken: {not: null}
      },
      data: {refreshToken: null}
    });

    return {logout: true}
  }

  async createTokens(userId: string, email: string){
    const accessToken = this.jwt.sign({
      userId,
      email,
    }, 
    {
      expiresIn: '10s', 
      secret: this.configServices.get('ACCESSTOKEN')
    })

    const refreshToken = await this.jwt.sign({
      userId,
      email,
      accessToken,
    }, {
      expiresIn: '10s',
      secret: this.configServices.get('REFRESHTOKEN')
    })
    return {accessToken, refreshToken}
  }

  async updateRefreshToken(userId: string, refreshToken: string){
    await this.Prisma.user.update({
      where: {id: userId}, data: {refreshToken}
    })
  }
}

