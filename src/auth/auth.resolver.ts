import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { SignResponse } from './dto/sign-response-dto';
import { SignInInput } from './dto/sign-in-input';
import { LogOutResponse } from './dto/log-out-dtos';
import { Public } from './decorators/public.decorator';
import { NewTokenResponse } from './dto/newToken.response';
import { CurrentUserId } from './decorators/current.userId.decorator';
import { CurrentUser } from './decorators/currentUser.decorator';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignResponse)
  signup(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.authService.signup(signUpInput);
  }

  @Public()
  @Mutation(() => SignResponse, { name: 'signInInput' })
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.authService.signIn(signInInput);
  }

  @Query(() => [Auth], { name: 'allUsers' })
  findAll() {
    return this.authService.findAll();
  }

  @Mutation(() => Auth)
  updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
    return this.authService.update(updateAuthInput.id, updateAuthInput);
  }

  @Mutation(() => LogOutResponse)
  logout(@Args('id', { type: () => String }) id: string) {
    return this.authService.logout(id);
  }

  // @Public()
  @Query(()=> String)
  hello(){
    return 'helloooo World'
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(()=> NewTokenResponse)
  getNewToken(
  @CurrentUserId() id: string, 
  @CurrentUser('refreshToken') refreshToken: string){
    return this.authService.getNewTokens(id, refreshToken)
  }
}
