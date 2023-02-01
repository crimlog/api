import { AttendanceRecord } from '@prisma/client';
import { courseSeed } from './course';
import { professorSeed } from './professor';
import { studentSeed } from './student';

export const attendanceRecordSeed: AttendanceRecord[] = [
	{
		id: '636fe6844498e9db2cf95607',
		studentId: studentSeed[0].id,
		professorId: professorSeed[0].id,
		courseId: courseSeed[0].id,
		timestamp: 1675045509506,
		imageURL: 'https://www.example.com/image.png',
	},
];
