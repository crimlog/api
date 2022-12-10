import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { professorInclude } from '../prisma-query-types';

@Injectable()
export class ProfessorService {
	constructor(private prisma: PrismaService) {}

	findAll(include = professorInclude) {
		return this.prisma.professor.findMany({ include });
	}

	findOne(id: string, include = professorInclude) {
		return this.prisma.professor.findUnique({ where: { id }, include });
	}
}
