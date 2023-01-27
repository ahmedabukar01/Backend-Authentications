import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'
import { PayloadJwt } from "../types";

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy,'jwtStrategy'){
    constructor(public config: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('ACCESSTOKEN'),
            passportToCallback: true,
        })
    }

    async validate( payload: PayloadJwt){
        return payload;
    }
}