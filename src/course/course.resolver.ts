import { Args, Query, Resolver } from '@nestjs/graphql';
import { CourseService } from './course.service';

@Resolver('Course')
export class CourseResolver {
	constructor(private readonly courseService: CourseService) {}

	@Query()
	course(@Args('id') id: string) {
		return this.courseService.findOne(id);
	}

	@Query()
	courses() {
		return this.courseService.findAll();
	}
}
