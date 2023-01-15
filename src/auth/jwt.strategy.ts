import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: process.env.DISABLE_AUTH ?? false,
			secretOrKey: process.env.JWT_SECRET,
			logging: true,
		});
	}

	async validate(payload: unknown) {
		return payload;
	}
}
