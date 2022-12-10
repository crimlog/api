import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceQueueService } from './attendance-queue.service';

describe('AttendanceQueueService', () => {
	let service: AttendanceQueueService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AttendanceQueueService],
		}).compile();

		service = module.get<AttendanceQueueService>(AttendanceQueueService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
