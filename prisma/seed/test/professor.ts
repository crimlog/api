import { Professor } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export const professorSeed: Professor[] = [
	{
		id: '636fe6844498e9db2cf95606',
		first: 'Mark',
		last: 'Reha',
		walletAddress: '0x400079e136520A50975fd1baB3c42EB5494D8BA7',
		nonce: randomUUID(),
	},
];
