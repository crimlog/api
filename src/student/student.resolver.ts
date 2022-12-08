import { Args, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';

@Resolver('Student')
export class StudentResolver {
	constructor(private readonly studentService: StudentService) {}

	@Query()
	student(@Args('id') id: number) {
		return this.studentService.findOne(id);
	}

	@Query()
	students() {
		return this.studentService.findAll();
	}
}
