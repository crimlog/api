import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
	constructor() {}

	@Get('/')
	async health() {
		return { status: 'OK' };
	}
}
