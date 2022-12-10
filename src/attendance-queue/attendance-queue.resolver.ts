import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetIncludeObj } from '../decorators/getIncludeObj.decorator';
import { attendanceQueueInclude } from '../prisma-query-types';
import { AttendanceQueueService } from './attendance-queue.service';

@Resolver('AttendanceQueue')
export class AttendanceQueueResolver {
	constructor(private readonly attendanceQueueService: AttendanceQueueService) {}

	@Query()
	attendanceQueue(@Args('id') id: string, @GetIncludeObj(attendanceQueueInclude) include) {
		return this.attendanceQueueService.findOne(id, include);
	}

	@Query()
	attendanceQueues(@GetIncludeObj(attendanceQueueInclude) include) {
		return this.attendanceQueueService.findAll(include);
	}
}
