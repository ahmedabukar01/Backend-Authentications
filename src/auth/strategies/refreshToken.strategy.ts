import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { jwtPayload } from "../types/index";
import { Request } from "express";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy,'refreshStrategy'){
    constructor(public config: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('REFRESHTOKEN'),
            passportToCallback: true,
        })
    }

    async validate(req: Request, payload: jwtPayload){
        const refreshToken = req
        ?.get('authorization')
        ?.replace('Bearer', '')
        ?.trim()
        return {
           ...payload,
           refreshToken
        };
    }
}