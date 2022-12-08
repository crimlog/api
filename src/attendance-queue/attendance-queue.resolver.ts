import { Args, Query, Resolver } from '@nestjs/graphql';
import { AttendanceQueueService } from './attendance-queue.service';

@Resolver('AttendanceQueue')
export class AttendanceQueueResolver {
	constructor(private readonly attendanceQueueService: AttendanceQueueService) {}

	@Query()
	attendanceQueue(@Args('id') id: string) {
		return this.attendanceQueueService.findOne(id);
	}

	@Query()
	attendanceQueues() {
		return this.attendanceQueueService.findAll();
	}
}
