import { gql } from 'graphql-request';
import { Student } from '../graphql/typings';
import { studentSeed as _studentSeed } from '../prisma/seed/test';
import { _afterAll, _beforeAll } from './hooks';
import { GraphQLClient } from './util';

// strip out unwanted properties
const studentSeed = _studentSeed.map(
	({ attendanceQueueIds, courseIds, honorsCourseIds, ...rest }) => rest,
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

describe('Student', () => {
	test('when all Students are queried, then it should return them', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ students: Student[] }>(gql`
            query {
                students {
                    id
                    cardId
                    first
                    last
                    walletAddress
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { students } = res;
		expect(students).toBeDefined();
		expect(students).toHaveLength(studentSeed.length);
		expect(students).toMatchObject(studentSeed);
	});

	test('when an existing Student is queried, then it should return it', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ student: Student }>(gql`
            query {
                student(id: ${studentSeed[0].id}) {
                    id
                    cardId
                    first
                    last
                    walletAddress
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { student } = res;
		expect(student).toBeDefined();
		expect(student).toMatchObject(studentSeed.find(({ id }) => id === studentSeed[0].id));
	});

	test('when asked for a non-existent Student, then it returns null', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ student: Student }>(gql`
            query {
                student(id: 999) {
                    id
                    cardId
                    first
                    last
                    walletAddress
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { student } = res;
		expect(student).toBeNull();
	});

	test('when an existing Student is queried by CardId, then it should return it', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ studentByCardId: Student }>(gql`
            query {
                studentByCardId(cardId: "${studentSeed[0].cardId}") {
                    id
                    cardId
                    first
                    last
                    walletAddress
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { studentByCardId } = res;
		expect(studentByCardId).toBeDefined();
		expect(studentByCardId).toMatchObject(studentSeed.find(({ id }) => id === studentSeed[0].id));
	});

	test('when an non-existent Student is queried by CardId, then it should return null', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ studentByCardId: Student }>(gql`
            query {
                studentByCardId(cardId: "99:99:99:99:99:99:99") {
                    id
                    cardId
                    first
                    last
                    walletAddress
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { studentByCardId } = res;
		expect(studentByCardId).toBeNull();
	});
});
