import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';
import { ProfessorService } from './professor.service';

describe('ProfessorService', () => {
	let service: ProfessorService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProfessorService],
			imports: [PrismaModule],
		}).compile();

		service = module.get<ProfessorService>(ProfessorService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
