import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { attendanceQueueInclude } from '../prisma-query-types';

@Injectable()
export class AttendanceQueueService {
	constructor(private prisma: PrismaService) {}

	findAll(include = attendanceQueueInclude) {
		return this.prisma.attendanceQueue.findMany({ include });
	}

	findOne(id: string, include = attendanceQueueInclude) {
		return this.prisma.attendanceQueue.findUnique({ where: { id }, include });
	}
}
