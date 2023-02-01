import { personalSign } from '@metamask/eth-sig-util';
import { ClientError, gql } from 'graphql-request';
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

	describe('Professor authentication flow', () => {
		test("when an existing Professor's nonce is queried, then it should return it", async () => {
			// Arrange
			// arrangement done in seed

			// Act
			const res = await api.req<{ professorNonce: String }>(gql`
				query {
					professorNonce(walletAddress: "${professorSeed[0].walletAddress}") 
				}
			`);

			// Assert
			expect(res).toBeDefined();

			const { professorNonce } = res;
			expect(professorNonce).toBeDefined();
			expect(typeof professorNonce).toBe('string');
		});

		test("when an non-existent Professor's nonce is queried, then it should return an error", async () => {
			// Arrange
			// arrangement done in seed

			// Act
			const res: ClientError = await api.req(gql`
				query {
					professorNonce(walletAddress: "0x999999") 
				}
			`);

			// Assert
			expect(res).toBeDefined();

			const { message } = res;
			expect(message.includes('No Professor found')).toBeTruthy();
		});

		test('when a Professor is logged in with a signed nonce, then it should return a JWT', async () => {
			// Arrange
			const { professorNonce: nonce } = await api.req<{ professorNonce: String }>(gql`
				query {
					professorNonce(walletAddress: "${professorSeed[0].walletAddress}") 
				}
			`);

			const signature = personalSign({
				privateKey: Buffer.from(
					'e400bc593b81c40dc8d8ad1723e2fe2ea69542a782a0344c35ed18a14cc3d1bb',
					'hex',
				),
				data: `Sign message to login to CrimLog: ${nonce}`,
			});

			// Act
			const res = await api.req<{ professorLogin: String }>(gql`
				mutation {
					professorLogin(walletAddress: "${professorSeed[0].walletAddress}", signature: "${signature}") 
				}
			`);

			// Assert
			expect(res).toBeDefined();

			const { professorLogin } = res;
			expect(professorLogin).toBeDefined();
			expect(professorLogin).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/); // https://www.regextester.com/105777
		});

		test.todo(
			'when a Professor is logged in with an invalid nonce, then it should return an error',
		);

		test.todo('when a Professor is successfully logged in, then it should change the nonce');

		test.todo(
			'when a Professor is authenticated, then it should be able to retrieve its own information',
		);
	});
});
