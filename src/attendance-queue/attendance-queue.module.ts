import { Module } from '@nestjs/common';
import { AttendanceQueueResolver } from './attendance-queue.resolver';
import { AttendanceQueueService } from './attendance-queue.service';

@Module({
  providers: [AttendanceQueueResolver, AttendanceQueueService]
})
export class AttendanceQueueModule {}
