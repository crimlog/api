import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { courseInclude } from '../prisma-query-types';

@Injectable()
export class CourseService {
	constructor(private prisma: PrismaService) {}

	findAll(include = courseInclude) {
		return this.prisma.course.findMany({ include });
	}

	findOne(id: string, include = courseInclude) {
		return this.prisma.course.findUnique({ where: { id }, include });
	}
}
