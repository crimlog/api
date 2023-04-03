import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttendanceQueueInput } from '../../graphql/typings';
import { GetIncludeObj } from '../decorators/getIncludeObj.decorator';
import { attendanceQueueInclude, attendanceRecordInclude } from '../prisma-query-types';
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

	@Query()
	attendanceQueueByCourseId(
		@Args('courseId') id: string,
		@GetIncludeObj(attendanceQueueInclude) include,
	) {
		return this.attendanceQueueService.attendanceQueueByCourseId(id, include);
	}

	@Mutation()
	attendanceQueueCreate(
		@Args('attendanceQueue') attendanceQueue: AttendanceQueueInput,
		@GetIncludeObj(attendanceQueueInclude) include,
	) {
		return this.attendanceQueueService.attendanceQueueCreate(attendanceQueue, include);
	}

	@Mutation()
	attendanceQueueAddStudent(
		@Args('queueId') queueId: string,
		@Args('studentId') studentId: number,
		@GetIncludeObj(attendanceQueueInclude) include,
	) {
		return this.attendanceQueueService.attendanceQueueAddStudent(queueId, studentId, include);
	}

	@Mutation()
	attendanceQueueRemoveStudent(
		@Args('queueId') queueId: string,
		@Args('studentId') studentId: number,
		@GetIncludeObj(attendanceQueueInclude) include,
	) {
		return this.attendanceQueueService.attendanceQueueRemoveStudent(queueId, studentId, include);
	}

	@Mutation()
	attendanceQueueClose(
		@Args('queueId') queueId: string,
		@GetIncludeObj(attendanceQueueInclude) include,
	) {
		return this.attendanceQueueService.attendanceQueueClose(queueId, include);
	}

	@Mutation()
	attendanceQueueMint(
		@Args('queueId') queueId: string,
		@GetIncludeObj(attendanceRecordInclude) include,
	) {
		return this.attendanceQueueService.attendanceQueueMint(queueId, include);
	}

	@Mutation()
	attendanceQueueMintStudent(
		@Args('queueId') queueId: string,
		@Args('studentId') studentId: number,
		@GetIncludeObj(attendanceRecordInclude) include,
	) {
		return this.attendanceQueueService.attendanceQueueMintStudent(queueId, studentId, include);
	}
}
