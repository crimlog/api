import { Student } from '@prisma/client';

export const studentSeed: Student[] = [
	{
		id: 12345678,
		cardId: '20:63:87:62:01:02',
		first: 'Melanie',
		last: 'Spence',
		walletAddress: '0x123456',
		courseIds: ['636fe6844498e9db2cf95605'],
		honorsCourseIds: [],
		attendanceQueueIds: [],
	},
];
