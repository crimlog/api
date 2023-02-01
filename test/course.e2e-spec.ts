import { gql } from 'graphql-request';
import { Course } from '../graphql/typings';
import { courseSeed as _courseSeed } from '../prisma/seed/test';
import { _afterAll, _beforeAll } from './hooks';
import { GraphQLClient } from './util';

// map seed properties to graphql responses
const courseSeed = _courseSeed.map(({ honorsStudentIds, professorId, studentIds, ...rest }) => ({
	honorsStudents: honorsStudentIds.map((id) => ({ id })),
	students: studentIds.map((id) => ({ id })),
	professor: { id: professorId },
	...rest,
}));
let api: GraphQLClient;

beforeAll(async () => {
	// use common beforeAll code
	({ api } = await _beforeAll());
});

afterAll(async () => {
	// use common afterAll code
	await _afterAll();
});

describe('Course', () => {
	test('when all Courses are queried, then it should return them', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ courses: Course[] }>(gql`
            query {
                courses {
                    id
                    code
                    name
                    professor {
                        id
                    }
                    students {
                        id
                    }
                    honorsStudents {
                        id
                    }
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { courses } = res;
		expect(courses).toBeDefined();
		expect(courses).toHaveLength(courseSeed.length);
		expect(courses).toMatchObject(courseSeed);
	});

	test('when an existing Course is queried, then it should return it', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ course: Course }>(gql`
            query {
                course(id: "${courseSeed[0].id}") {
                    id
                    code
                    name
                    professor {
                        id
                    }
                    students {
                        id
                    }
                    honorsStudents {
                        id
                    }
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { course } = res;
		expect(course).toBeDefined();
		expect(course).toMatchObject(courseSeed.find(({ id }) => id === courseSeed[0].id));
	});

	test('when asked for a non-existent Course, then it returns null', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ course: Course }>(gql`
            query {
                course(id: "111fe6844498e9db2cf95605") {
                    id
                    code
                    name
                    professor {
                        id
                    }
                    students {
                        id
                    }
                    honorsStudents {
                        id
                    }
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { course } = res;
		expect(course).toBeNull();
	});
});
