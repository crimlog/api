import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Query()
	professorNonce(@Args('walletAddress') walletAddress: string) {
		return this.authService.professorNonce(walletAddress);
	}

	@Mutation()
	professorLogin(
		@Args('walletAddress') walletAddress: string,
		@Args('signature') signature: string,
	) {
		return this.authService.professorLogin(walletAddress, signature);
	}
}
