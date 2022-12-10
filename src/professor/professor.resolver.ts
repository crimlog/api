import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetIncludeObj } from '../decorators/getIncludeObj.decorator';
import { professorInclude } from '../prisma-query-types';
import { ProfessorService } from './professor.service';

@Resolver('Professor')
export class ProfessorResolver {
	constructor(private readonly professorService: ProfessorService) {}

	@Query()
	professor(@Args('id') id: string, @GetIncludeObj(professorInclude) include) {
		return this.professorService.findOne(id, include);
	}

	@Query()
	professors(@GetIncludeObj(professorInclude) include) {
		return this.professorService.findAll(include);
	}
}
