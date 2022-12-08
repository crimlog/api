import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StudentService {
	constructor(private prisma: PrismaService) {}

	findAll() {
		return this.prisma.student.findMany();
	}

	findOne(id: number) {
		return this.prisma.student.findUnique({ where: { id } });
	}
}
