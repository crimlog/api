import type { INestApplication, LoggerService, LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let app: INestApplication;

export async function initializeApp(
	PORT = process.env.PORT || 3000,
	{
		logger = ['error', 'warn', 'debug', 'log'],
		abortOnError = false,
	}: { logger?: false | LoggerService | LogLevel[]; abortOnError?: boolean } = {},
) {
	app = await NestFactory.create(AppModule, { logger, abortOnError });

	await app.listen(PORT);

	return app.getHttpServer().address();
}

export async function destroyApp() {
	return await app.close();
}
