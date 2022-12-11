import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';
import { StudentService } from './student.service';

describe('StudentService', () => {
	let service: StudentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [StudentService],
			imports: [PrismaModule],
		}).compile();

		service = module.get<StudentService>(StudentService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
