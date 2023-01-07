import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async professorNonce(walletAddress: string) {
		// there should be no situation where a Professor doc does not have a nonce
		// initial nonces should be generated and inserted on doc creation
		return (
			await this.prisma.professor.findFirstOrThrow({
				where: { walletAddress },
			})
		)?.nonce;
	}

	async professorLogin(walletAddress: string, signature: string) {
		// fetch the Professor doc, throw if DNE
		const professor = await this.prisma.professor.findFirstOrThrow({
			where: { walletAddress },
		});

		// extract signer address from signature
		const signerAddress = recoverPersonalSignature({
			signature,
			data: `Sign message to login to CrimLog: ${professor.nonce}`,
		});
		console.log('signerAddress', signerAddress);

		if (signerAddress.toLowerCase() !== walletAddress.toLowerCase())
			throw new Error('Invalid signature');

		// regenerate nonce
		await this.prisma.professor.update({
			where: { walletAddress },
			data: { nonce: randomUUID() },
		});

		return professor;
	}
}
