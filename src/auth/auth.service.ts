import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
    login() {
        const payload = {
            id: 1,
        };
        // const option = { expiresIn: '5m' };
        const token = this.jwtService.sign(payload, {
            expiresIn: '5h',
        });
        return token;
    }

    register() {
        return 'register';
    }
}
