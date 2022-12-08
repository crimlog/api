import { Module } from '@nestjs/common';
import { AttendanceRecordService } from './attendance-record.service';
import { AttendanceRecordResolver } from './attendance-record.resolver';

@Module({
  providers: [AttendanceRecordResolver, AttendanceRecordService]
})
export class AttendanceRecordModule {}
