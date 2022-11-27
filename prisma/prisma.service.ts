import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor() {
		const log: Prisma.LogLevel[] = ['error'];
		process.env.PRISMA_LOGGING === 'true' && log.push('query', 'info', 'warn');

		super({
			log,
			errorFormat: 'colorless',
		});
	}

	async onModuleInit() {
		await this.$connect();
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}
}
