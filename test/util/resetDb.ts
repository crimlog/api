import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// removes all data from db, including the database itself
export async function resetDb() {
	try {
		console.time('Resetting database');
		// https://www.mongodb.com/docs/manual/reference/command/dropDatabase/#mongodb-dbcommand-dbcmd.dropDatabase
		await prisma.$runCommandRaw({ dropDatabase: 1 });
	} catch (error) {
		console.error(error);
	} finally {
		console.timeEnd('Resetting database');
	}
}
