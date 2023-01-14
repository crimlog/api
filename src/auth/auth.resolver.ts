import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProfessorService } from '../professor/professor.service';
import { AuthService } from './auth.service';
import { ProfessorGuard } from './professor.guard';

@Resolver('Auth')
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly professorService: ProfessorService,
	) {}

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

	@Query()
	@UseGuards(ProfessorGuard)
	professorSelf(@Context('req') { user }: { user: { [key: string]: string } }) {
		return this.professorService.findOne(user.id);
	}
}
