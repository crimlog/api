import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CourseService {
	constructor(private prisma: PrismaService) {}

	findAll() {
		return this.prisma.course.findMany();
	}

	findOne(id: string) {
		return this.prisma.course.findUnique({ where: { id } });
	}
}
