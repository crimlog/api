import { Args, Query, Resolver } from '@nestjs/graphql';
import { AttendanceRecordService } from './attendance-record.service';

@Resolver('AttendanceRecord')
export class AttendanceRecordResolver {
	constructor(private readonly attendanceRecordService: AttendanceRecordService) {}

	@Query()
	attendanceRecord(@Args('id') id: string) {
		return this.attendanceRecordService.findOne(id);
	}

	@Query()
	attendanceRecords() {
		return this.attendanceRecordService.findAll();
	}
}
