import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";
import { UserEntity } from "src/user/user.entity";

@ObjectType()
export class SignResponse {
    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    accessToken: string;

    // @IsNotEmpty()
    // @IsString()
    @Field(() => String)
    refreshToken: string;

    @Field(() => UserEntity)
    user: UserEntity

}