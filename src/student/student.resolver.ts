import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetIncludeObj } from '../decorators/getIncludeObj.decorator';
import { studentInclude } from '../prisma-query-types';
import { StudentService } from './student.service';

@Resolver('Student')
export class StudentResolver {
	constructor(private readonly studentService: StudentService) {}

	@Query()
	student(@Args('id') id: number, @GetIncludeObj(studentInclude) include) {
		return this.studentService.findOne(id, include);
	}

	@Query()
	students(@GetIncludeObj(studentInclude) include) {
		return this.studentService.findAll(include);
	}
}
