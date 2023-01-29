// https://stackoverflow.com/questions/48318230/configure-jest-global-tests-setup-with-ts-file-typescript/74206721#74206721
require('ts-node').register({ transpileOnly: true });
require('tsconfig-paths').register();
import { execSync } from 'child_process';

export default async function globalTeardown() {
	console.time('globalTeardown');

	if (process.env.NODE_ENV.toLowerCase() === 'ci') {
		console.log('CI detected, killing database');
		// kill test database
		const execRes = execSync('docker compose -f docker-compose.test.yml down -d');
		console.log(execRes.toString());
	}

	console.timeEnd('globalTeardown');
}
