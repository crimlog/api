import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('AuthResolver', () => {
	let resolver: AuthResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AuthResolver, AuthService],
			imports: [PrismaModule],
		}).compile();

		resolver = module.get<AuthResolver>(AuthResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
