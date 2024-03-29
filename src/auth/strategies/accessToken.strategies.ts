import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { jwtPayload } from "../types/index";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy,'jwtStrategy'){
    constructor(public config: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('ACCESSTOKEN'),
            passportToCallback: true,
        })
    }

    async validate( payload: jwtPayload){
        return payload;
    }
}