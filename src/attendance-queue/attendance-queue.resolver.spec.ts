import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceQueueResolver } from './attendance-queue.resolver';
import { AttendanceQueueService } from './attendance-queue.service';

describe('AttendanceQueueResolver', () => {
	let resolver: AttendanceQueueResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AttendanceQueueResolver, AttendanceQueueService],
		}).compile();

		resolver = module.get<AttendanceQueueResolver>(AttendanceQueueResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
