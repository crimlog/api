import {
	AttendanceQueue,
	AttendanceQueueStatus,
	AttendanceRecord,
	Course,
	PrismaClient,
	Professor,
	Student,
} from '@prisma/client';
const prisma = new PrismaClient();

const _student: Student = {
	id: 12345678,
	cardId: '20:63:87:62:01:02',
	first: 'Melanie',
	last: 'Spence',
	walletAddress: '0x123456',
	courseIds: [],
	honorsCourseIds: [],
	attendanceQueueIds: [],
};

const _professor: Professor = {
	id: '636fe6844498e9db2cf95606',
	first: 'Mark',
	last: 'Reha',
};

const _course: Course = {
	id: '636fe6844498e9db2cf95605',
	code: 'CST-451',
	name: 'Senior Capstone I',
	professorId: _professor.id,
	studentIds: [],
	honorsStudentIds: [],
};

const _attendanceRecord: AttendanceRecord = {
	id: '636fe6844498e9db2cf95607',
	studentId: _student.id,
	professorId: _professor.id,
	courseId: _course.id,
	timestamp: Date.now(),
	imageURL: 'https://www.example.com/image.png',
};

const _attendanceQueue: AttendanceQueue = {
	id: '636fe6844498e9db2cf95608',
	status: AttendanceQueueStatus.ACTIVE,
	studentIds: [],
	courseId: _course.id,
	timestamp: Date.now(),
};

(async function () {
	try {
		//Seed data
		console.log(`Creating student ${_student.first} ${_student.last}...`);
		const student = await prisma.student.upsert({
			where: { id: _student.id },
			update: {},
			create: _student,
		});
		console.log(`Student ${student.first} ${student.last} created with ID ${student.id}`);

		console.log(`Creating professor ${_professor.first} ${_professor.last}...`);
		const professor = await prisma.professor.upsert({
			where: { id: _professor.id },
			update: {},
			create: _professor,
		});
		console.log(`Professor ${professor.first} ${professor.last} created with ID ${professor.id}`);

		console.log(`Creating course ${_course.code} ${_course.name}...`);
		const course = await prisma.course.upsert({
			where: { id: _course.id },
			update: {},
			create: _course,
		});
		console.log(`Course ${course.code} ${course.name} created with ID ${course.id}`);

		console.log('Creating attendance record...');
		const attendanceRecord = await prisma.attendanceRecord.upsert({
			where: { id: _attendanceRecord.id },
			update: {},
			create: _attendanceRecord,
		});
		console.log(`Attendance record created with ID ${attendanceRecord.id}`);

		console.log('Creating attendance queue...');
		const attendanceQueue = await prisma.attendanceQueue.upsert({
			where: { id: _attendanceQueue.id },
			update: {},
			create: _attendanceQueue,
		});
		console.log(`Attendance queue created with ID ${attendanceQueue.id}`);

		// Establish relationships
		console.log(
			`Enrolling student ${student.first} ${student.last} in course ${course.code} ${course.name}...`,
		);
		await prisma.course.update({
			where: { id: course.id },
			data: {
				students: {
					connect: [{ id: student.id }],
				},
			},
		});
		console.log(
			`Student ${student.first} ${student.last} enrolled in course ${course.code} ${course.name}`,
		);

		console.log(
			`Adding student ${student.first} ${student.last} to attendance queue ${attendanceQueue.id}...`,
		);
		await prisma.attendanceQueue.update({
			where: { id: attendanceQueue.id },
			data: {
				students: {
					connect: [{ id: student.id }],
				},
			},
		});
		console.log(
			`Student ${student.first} ${student.last} added to attendance queue ${attendanceQueue.id}`,
		);
	} catch (e) {
		console.error(e);
	} finally {
		prisma.$disconnect();
	}
})();
