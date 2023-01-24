import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Auth {
  @Field(() => String)
  id?: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String, {nullable: true})
  refreshToken?: string;

  @Field(() => String)
  createdAt?: string;

  @Field(() => String)
  updatedAt?: string;

}
