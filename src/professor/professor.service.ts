import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProfessorService {
	constructor(private prisma: PrismaService) {}

	findAll() {
		return this.prisma.professor.findMany();
	}

	findOne(id: string) {
		return this.prisma.professor.findUnique({ where: { id } });
	}
}
