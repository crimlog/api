import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProfessorResolver } from './professor.resolver';
import { ProfessorService } from './professor.service';

describe('ProfessorResolver', () => {
	let resolver: ProfessorResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProfessorResolver, ProfessorService],
			imports: [PrismaModule],
		}).compile();

		resolver = module.get<ProfessorResolver>(ProfessorResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
