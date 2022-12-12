import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { attendanceRecordInclude } from '../prisma-query-types';

@Injectable()
export class AttendanceRecordService {
	constructor(private prisma: PrismaService) {}

	findAll(include = attendanceRecordInclude) {
		return this.prisma.attendanceRecord.findMany({ include });
	}

	findOne(id: string, include = attendanceRecordInclude) {
		return this.prisma.attendanceRecord.findUnique({ where: { id }, include });
	}
}
