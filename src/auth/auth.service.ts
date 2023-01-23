import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import * as argon from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private Prisma: PrismaService, 
    private jwt: JwtService,
    private configServices: ConfigService
    ){}

  async signup(signUpInput: SignUpInput) {
    const hashedPassword = await argon.hash(signUpInput.password)
    const user = this.Prisma.user.create({
      data: {
        ...signUpInput,
        password: hashedPassword
      }
    })
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
