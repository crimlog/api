import { AttendanceRecord } from '@prisma/client';

export const attendanceRecordSeed: AttendanceRecord[] = [
	{
		id: '636fe6844498e9db2cf95607',
		studentId: 12345678,
		professorId: '636fe6844498e9db2cf95606',
		courseId: '636fe6844498e9db2cf95605',
		timestamp: Date.now(),
		imageURL: 'https://www.example.com/image.png',
	},
];
