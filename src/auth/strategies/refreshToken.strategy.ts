import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { jwtPayload, JwtPayloadWithRefreshtoken } from "../types/index";
import { Request, Response } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,'refreshStrategy'){
    constructor(public config: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('REFRESHTOKEN'),
            passportToCallback: true,
        })
    }

    async validate(req: Request, res: Response, payload: jwtPayload){
        console.log(req, 'request', res, 'res', payload, "payload")
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