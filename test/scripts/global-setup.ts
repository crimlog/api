require('dotenv').config({ path: '.env.test' }); // test env NEEDS to be loaded first
require('tsconfig-paths/register'); // required for Jest to transpile this ts file
// external npm modules cannot be used in this file (https://jestjs.io/docs/configuration#globalsetup-string)

import { execSync } from 'child_process';
import { seedTest } from '../../prisma/test.seed';
import { isPortReachable, resetDb } from '../util';

export default async function globalSetup() {
	console.time('globalSetup');

	const isDBReachable = await isPortReachable(27017);
	// if db already live, do nothing
	if (!isDBReachable) {
		// if not live, create test database
		// begin composing containers
		const dockerRes = execSync('docker compose -f docker-compose.test.yml up -d'); // also consider --wait flag
		console.log(dockerRes.toString()); //send output to console

		// wait some time to ensure db is accessible by prisma
		await new Promise((resolve) => setTimeout(resolve, 4000));

		// push prisma schema to db
		const prismaRes = execSync('npx prisma db push --skip-generate');
		console.log(prismaRes.toString()); //send output to console
	}

	// reset database & seed data
	await resetDb();
	await seedTest();

	console.timeEnd('globalSetup');
}
