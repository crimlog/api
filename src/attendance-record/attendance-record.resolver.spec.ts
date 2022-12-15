import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';
import { AttendanceRecordResolver } from './attendance-record.resolver';
import { AttendanceRecordService } from './attendance-record.service';

describe('AttendanceRecordResolver', () => {
	let resolver: AttendanceRecordResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AttendanceRecordResolver, AttendanceRecordService],
			imports: [PrismaModule],
		}).compile();

		resolver = module.get<AttendanceRecordResolver>(AttendanceRecordResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
