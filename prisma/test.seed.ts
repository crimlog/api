// Seed test data into a test database - only seed what is required

import { PrismaClient } from '@prisma/client';
import { attendanceRecordSeed, courseSeed, professorSeed, studentSeed } from './seed/test';
const prisma = new PrismaClient();

// order matters b/c of constraints
const seedMethods = {
	students: function () {
		return prisma.student.createMany({
			data: studentSeed,
		});
	},
	professors: function () {
		return prisma.professor.createMany({
			data: professorSeed,
		});
	},
	courses: function () {
		return prisma.course.createMany({
			data: courseSeed,
		});
	},
	attendanceRecords: function () {
		return prisma.attendanceRecord.createMany({
			data: attendanceRecordSeed,
		});
	},
};

/**
 * Emulate a university's default seeded data (students, courses, professors, etc)
 */
export async function seedTest() {
	try {
		console.time('Prisma Seed (Test data)');
		for (const method in seedMethods) {
			console.time(method);
			await seedMethods[method]();
			console.timeEnd(method);
		}

		console.timeEnd('Prisma Seed (Test data)');
	} catch (e) {
		console.error(e);
	} finally {
		await prisma.$disconnect();
	}
}

// "hacky" way to run seed file from command line
if (process.argv.includes('--execute')) (async () => await seedTest())();
