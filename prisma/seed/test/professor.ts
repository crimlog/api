import { Professor } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export const professorSeed: Professor[] = [
	{
		id: '636fe6844498e9db2cf95606',
		first: 'Mark',
		last: 'Reha',
		walletAddress: '0x123457',
		nonce: randomUUID(),
	},
];
