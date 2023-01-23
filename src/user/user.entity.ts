import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserEntity{
    @Field(()=> String, {description: 'User id'})
    id: string

    @Field(()=> String)
    username: string

    @Field(()=> String)
    email: string
}