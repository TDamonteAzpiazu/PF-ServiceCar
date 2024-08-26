import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import * as dotenv from 'dotenv';


dotenv.config(); 

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];

        if (!authHeader) {
            throw new UnauthorizedException('Bearer token not found');
        }

        const token = authHeader.split(' ')[1]; 

        if (!token) {
            throw new UnauthorizedException('Bearer token not found');
        }

        try {
            const secret = process.env.JWT_SECRET;
            console.log(secret);
            const payload = this.jwtService.verify(token, { secret });
            console.log(payload);
            request.user = payload;
            return true;
        } catch (err) {
            console.error('JWT Verification Error:', err.message);
            throw new UnauthorizedException('Invalid token');
        }
    }
}
