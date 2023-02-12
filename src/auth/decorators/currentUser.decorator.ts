import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import {JwtPayloadWithRefreshtoken} from "../types/index"

export const CurrentUser = createParamDecorator(
    (
    data: keyof JwtPayloadWithRefreshtoken | undefined,
    context: ExecutionContext,
    ) =>{
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        if(data) return req.user[data];

        return req.user;
    }
)