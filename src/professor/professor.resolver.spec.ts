import { Test, TestingModule } from '@nestjs/testing';
import { ProfessorResolver } from './professor.resolver';
import { ProfessorService } from './professor.service';

describe('ProfessorResolver', () => {
	let resolver: ProfessorResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProfessorResolver, ProfessorService],
		}).compile();

		resolver = module.get<ProfessorResolver>(ProfessorResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
