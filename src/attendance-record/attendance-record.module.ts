import { Module } from '@nestjs/common';
import { AttendanceRecordResolver } from './attendance-record.resolver';
import { AttendanceRecordService } from './attendance-record.service';

@Module({
  providers: [AttendanceRecordResolver, AttendanceRecordService]
})
export class AttendanceRecordModule {}
