import { Course } from '@prisma/client';

export const courseSeed: Course[] = [
	{
		id: '636fe6844498e9db2cf95605',
		code: 'CST-451',
		name: 'Senior Capstone I',
		professorId: '636fe6844498e9db2cf95606',
		studentIds: [12345678],
		honorsStudentIds: [],
	},
	{
		id: '636fe6844498e9db2cf95608',
		code: 'CST-452',
		name: 'Senior Capstone II',
		professorId: '636fe6844498e9db2cf95606',
		studentIds: [12345678],
		honorsStudentIds: [],
	},
];
