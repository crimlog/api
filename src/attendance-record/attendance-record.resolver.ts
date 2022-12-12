import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetIncludeObj } from '../decorators/getIncludeObj.decorator';
import { attendanceRecordInclude } from '../prisma-query-types';
import { AttendanceRecordService } from './attendance-record.service';

@Resolver('AttendanceRecord')
export class AttendanceRecordResolver {
	constructor(private readonly attendanceRecordService: AttendanceRecordService) {}

	@Query()
	attendanceRecord(@Args('id') id: string, @GetIncludeObj(attendanceRecordInclude) include) {
		return this.attendanceRecordService.findOne(id, include);
	}

	@Query()
	attendanceRecords(@GetIncludeObj(attendanceRecordInclude) include) {
		return this.attendanceRecordService.findAll(include);
	}
}
