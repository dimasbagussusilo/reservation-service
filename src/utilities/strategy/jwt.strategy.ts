import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../../modules/auth/auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // private readonly usersService: UserService
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Add your secret key in .env
    });
  }

  // Validate JWT token and extract user
  async validate(payload: JwtPayload) {
    // const user = await this.usersService.findOne(payload.sub);
    // return user;
    return payload;
  }
}
