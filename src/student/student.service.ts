import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { studentInclude } from '../prisma-query-types';

@Injectable()
export class StudentService {
	constructor(private prisma: PrismaService) {}

	findAll(include = studentInclude) {
		return this.prisma.student.findMany({ include });
	}

	findOne(id: number, include = studentInclude) {
		return this.prisma.student.findUnique({ where: { id }, include });
	}
}
