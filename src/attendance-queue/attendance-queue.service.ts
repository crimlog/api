import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AttendanceQueueService {
	constructor(private prisma: PrismaService) {}

	findAll() {
		return this.prisma.attendanceQueue.findMany();
	}

	findOne(id: string) {
		return this.prisma.attendanceQueue.findUnique({ where: { id } });
	}
}
