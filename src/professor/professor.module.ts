import { Module } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorResolver } from './professor.resolver';

@Module({
  providers: [ProfessorResolver, ProfessorService]
})
export class ProfessorModule {}
