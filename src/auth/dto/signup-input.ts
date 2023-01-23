import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class SignUpInput {
    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    username: string;

    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    email: string;

    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    password: string;
}
