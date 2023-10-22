import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'VULEBAOLONG',
        });
    }

    prisma = new PrismaClient();

    async validate(decodeToken: any) {
        return await this.prisma.users.findFirst({
            where: {
                user_id: decodeToken.id,
            },
        });
    }
}
