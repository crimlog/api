import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';
import { AttendanceRecordService } from './attendance-record.service';

describe('AttendanceRecordService', () => {
	let service: AttendanceRecordService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AttendanceRecordService],
			imports: [PrismaModule],
		}).compile();

		service = module.get<AttendanceRecordService>(AttendanceRecordService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
