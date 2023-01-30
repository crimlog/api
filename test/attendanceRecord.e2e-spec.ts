import { gql } from 'graphql-request';
import { AttendanceRecord } from '../graphql/typings';
import { attendanceRecordSeed as _attendanceRecordSeed } from '../prisma/seed/test';
import { _afterAll, _beforeAll } from './hooks';
import { GraphQLClient } from './util';

// map seed properties to graphql responses
const attendanceRecordSeed = _attendanceRecordSeed.map(
	({ courseId, professorId, studentId, ...rest }) => ({
		course: { id: courseId },
		professor: { id: professorId },
		student: { id: studentId },
		...rest,
	}),
);
let api: GraphQLClient;

beforeAll(async () => {
	// use common beforeAll code
	({ api } = await _beforeAll());
});

afterAll(async () => {
	// use common afterAll code
	await _afterAll();
});

describe('AttendanceRecord', () => {
	test('when all AttendanceRecords are queried, then it should return them', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ attendanceRecords: AttendanceRecord[] }>(gql`
            query {
                attendanceRecords {
                    id
                    student {
                        id
                    }
                    professor {
                        id
                    }
                    course {
                        id
                    }
                    timestamp
                    imageURL
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { attendanceRecords } = res;
		expect(attendanceRecords).toBeDefined();
		expect(attendanceRecords).toHaveLength(attendanceRecordSeed.length);
		expect(attendanceRecords).toMatchObject(attendanceRecordSeed);
	});

	test('when an existing AttendanceRecord is queried, then it should return it', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ attendanceRecord: AttendanceRecord }>(gql`
            query {
                attendanceRecord(id: "${attendanceRecordSeed[0].id}") {
                    id
                    student {
                        id
                    }
                    professor {
                        id
                    }
                    course {
                        id
                    }
                    timestamp
                    imageURL
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { attendanceRecord } = res;
		expect(attendanceRecord).toBeDefined();
		expect(attendanceRecord).toMatchObject(
			attendanceRecordSeed.find(({ id }) => id === attendanceRecordSeed[0].id),
		);
	});

	test('when asked for a non-existent AttendanceRecord, then it returns null', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ attendanceRecord: AttendanceRecord }>(gql`
            query {
                attendanceRecord(id: "111fe6844498e9db2cf95605") {
                    id
                    student {
                        id
                    }
                    professor {
                        id
                    }
                    course {
                        id
                    }
                    timestamp
                    imageURL
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { attendanceRecord } = res;
		expect(attendanceRecord).toBeNull();
	});
});
