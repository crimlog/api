import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetIncludeObj } from '../decorators/getIncludeObj.decorator';
import { courseInclude } from '../prisma-query-types';
import { CourseService } from './course.service';

@Resolver('Course')
export class CourseResolver {
	constructor(private readonly courseService: CourseService) {}

	@Query()
	course(@Args('id') id: string, @GetIncludeObj(courseInclude) include) {
		return this.courseService.findOne(id, include);
	}

	@Query()
	courses(@GetIncludeObj(courseInclude) include) {
		return this.courseService.findAll(include);
	}
}
