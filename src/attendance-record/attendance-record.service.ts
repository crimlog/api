import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AttendanceRecordService {
	constructor(private prisma: PrismaService) {}

	findAll() {
		return this.prisma.attendanceRecord.findMany();
	}

	findOne(id: string) {
		return this.prisma.attendanceRecord.findUnique({ where: { id } });
	}
}
