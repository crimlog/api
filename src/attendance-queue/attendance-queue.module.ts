import { Module } from '@nestjs/common';
import { AttendanceQueueService } from './attendance-queue.service';
import { AttendanceQueueResolver } from './attendance-queue.resolver';

@Module({
  providers: [AttendanceQueueResolver, AttendanceQueueService]
})
export class AttendanceQueueModule {}
