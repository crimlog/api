import { gql } from 'graphql-request';
import { AttendanceQueue, AttendanceQueueInput } from '../graphql/typings';
import { courseSeed } from '../prisma/seed/test';
import { _afterAll, _beforeAll } from './hooks';
import { GraphQLClient } from './util';

let api: GraphQLClient;

beforeAll(async () => {
	// use common beforeAll code
	({ api } = await _beforeAll());
});

afterAll(async () => {
	// use common afterAll code
	await _afterAll();
});

describe('AttendanceQueue', () => {
	test('when all AttendanceQueues are queried, then it should return them', async () => {
		// Arrange
		// Create two AttendanceQueues
		const attendanceQueueData: AttendanceQueueInput[] = [{ courseId: courseSeed[0].id }];
		const createdAttendanceQueues = [];
		for (const attendanceQueue of attendanceQueueData) {
			const { attendanceQueueCreate } = await api.req<{ attendanceQueueCreate: AttendanceQueue }>(
				gql`
					mutation {
				  		attendanceQueueCreate(attendanceQueue: ${api.parseObject(attendanceQueue)}) {
							id
							status
							students {
								id
							}
							course {
								id
							}
							timestamp
				  		}
					}
				`,
			);
			createdAttendanceQueues.push(attendanceQueueCreate);
		}

		// Act
		// Get all AttendanceQueues
		const res = await api.req<{ attendanceQueues: AttendanceQueue[] }>(gql`
			query {
				attendanceQueues {
					id
					status
					students {
						id
					}
					course {
						id
					}
					timestamp
				}
			}
		`);

		// Assert
		expect(res).toBeDefined();

		const { attendanceQueues } = res;
		expect(attendanceQueues).toBeDefined();
		expect(attendanceQueues).toHaveLength(attendanceQueueData.length);
		expect(attendanceQueues).toMatchObject(createdAttendanceQueues);
	});

	test('when an existing AttendanceQueue is queried, then it should return it', async () => {
		// Arrange
		// Create an AttendanceQueue
		const attendanceQueueData: AttendanceQueueInput = { courseId: courseSeed[1].id };
		const { attendanceQueueCreate } = await api.req<{ attendanceQueueCreate: AttendanceQueue }>(
			gql`
				mutation {
			  		attendanceQueueCreate(attendanceQueue: ${api.parseObject(attendanceQueueData)}) {
						id
						status
						students {
							id
						}
						course {
							id
						}
						timestamp
			  		}
				}
			`,
		);

		// Act
		// Get the AttendanceQueue
		const res = await api.req<{ attendanceQueue: AttendanceQueue }>(gql`
			query {
				attendanceQueue(id: "${attendanceQueueCreate.id}") {
					id
					status
					students {
						id
					}
					course {
						id
					}
					timestamp
				}
			}
		`);

		// Assert
		expect(res).toBeDefined();

		const { attendanceQueue } = res;
		expect(attendanceQueue).toBeDefined();
		expect(attendanceQueue).toMatchObject(attendanceQueueCreate);
	});

	test('when asked for a non-existent AttendanceQueue, then it returns null', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ attendanceQueue: AttendanceQueue }>(gql`
            query {
                attendanceQueue(id: "111fe6844498e9db2cf95605") {
                    id
					status
					students {
						id
					}
					course {
						id
					}
					timestamp
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { attendanceQueue } = res;
		expect(attendanceQueue).toBeNull();
	});

	test.todo('when an AttendanceQueue is created, then it should return the new AttendanceQueue');

	test.todo(
		'when an AttendanceQueue is created with an existing course ID, then it should return an error',
	);

	describe('attendanceQueueAddStudent', () => {
		test.todo(
			'when a Student is added to an AttendanceQueue, then it should return the AttendanceQueue with the new Student',
		);

		test.todo(
			'when a non-existent Student is added to an AttendanceQueue, then it should return an error',
		);

		test.todo(
			'when a Student is added to an inactive AttendanceQueue, then it should return an error',
		);

		test.todo(
			"when a Student is added to an AttendanceQueue that they're already in, then it should return an error",
		);
	});

	describe('attendanceQueueRemoveStudent', () => {
		test.todo(
			'when a Student is removed from an AttendanceQueue, then it should return the AttendanceQueue without the Student',
		);

		test.todo(
			'when a non-existent Student is removed from an AttendanceQueue, then it should return an error',
		);

		test.todo(
			'when a Student is removed from an inactive AttendanceQueue, then it should return an error',
		);

		test.todo(
			"when a Student is removed from an AttendanceQueue that they're not in, then it should return an error",
		);
	});

	describe('attendanceQueueClose', () => {
		test.todo(
			'when an AttendanceQueue is closed, then it should return the AttendanceQueue with the CLOSED status',
		);

		test.todo('when a non-existent AttendanceQueue is closed, then it should return an error');

		test.todo('when an already closed AttendanceQueue is closed, then it should return an error');
	});

	describe('attendanceQueueMint', () => {
		test.todo(
			'when attendanceQueueMint is called, then it should set the status of the AttendanceQueue to MINTING',
		);

		test.todo(
			'when attendanceQueueMint is called with a non-existent AttendanceQueue, then it should return an error',
		);

		test.todo(
			'when attendanceQueueMint is done minting, then it should set the status of the AttendanceQueue to COMPLETE',
		);

		test.todo(
			'when attendanceQueueMint is done minting, then it should return an array of AttendanceRecords for each Student in the AttendanceQueue',
		);
	});
});
