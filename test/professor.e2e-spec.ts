import { gql } from 'graphql-request';
import { Professor } from '../graphql/typings';
import { professorSeed as _professorSeed } from '../prisma/seed/test';
import { _afterAll, _beforeAll } from './hooks';
import { GraphQLClient } from './util';

// map seed properties to graphql responses
const professorSeed = _professorSeed.map(({ nonce, ...rest }) => rest);
let api: GraphQLClient;

beforeAll(async () => {
	// use common beforeAll code
	({ api } = await _beforeAll());
});

afterAll(async () => {
	// use common afterAll code
	await _afterAll();
});

describe('Professor', () => {
	test('when all Professors are queried, then it should return them', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ professors: Professor[] }>(gql`
            query {
                professors {
                    id
                    first
                    last
                    walletAddress
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { professors } = res;
		expect(professors).toBeDefined();
		expect(professors).toHaveLength(professorSeed.length);
		expect(professors).toMatchObject(professorSeed);
	});

	test('when an existing Professor is queried, then it should return it', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ professor: Professor }>(gql`
            query {
                professor(id: "${professorSeed[0].id}") {
                    id
                    first
                    last
                    walletAddress
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { professor } = res;
		expect(professor).toBeDefined();
		expect(professor).toMatchObject(professorSeed.find(({ id }) => id === professorSeed[0].id));
	});

	test('when asked for a non-existent Professor, then it returns null', async () => {
		// Arrange
		// arrangement done in seed

		// Act
		const res = await api.req<{ professor: Professor }>(gql`
            query {
                professor(id: "111fe6844498e9db2cf95605") {
                    id
                    first
                    last
                    walletAddress
                }
            }
        `);

		// Assert
		expect(res).toBeDefined();

		const { professor } = res;
		expect(professor).toBeNull();
	});
});
