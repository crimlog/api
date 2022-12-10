import { Module } from '@nestjs/common';
import { ProfessorResolver } from './professor.resolver';
import { ProfessorService } from './professor.service';

@Module({
  providers: [ProfessorResolver, ProfessorService]
})
export class ProfessorModule {}
