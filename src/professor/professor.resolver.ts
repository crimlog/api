import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProfessorService } from './professor.service';

@Resolver('Professor')
export class ProfessorResolver {
	constructor(private readonly professorService: ProfessorService) {}

	@Query()
	professor(@Args('id') id: string) {
		return this.professorService.findOne(id);
	}

	@Query()
	professors() {
		return this.professorService.findAll();
	}
}
