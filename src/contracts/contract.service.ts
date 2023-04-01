import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import contract from './abi/CrimLogRecord.abi';

@Injectable()
export class ContractService {
	// public address of the CrimeLogRecord contract
	private readonly CONTRACT_ADDRESS = '0x9D2E3fD6136a5bF52Ead780c41C7288bC4A90442';
	// provider for interacting with the contract
	private readonly provider = new ethers.providers.AlchemyProvider(
		'maticmum',
		process.env.ALCHEMY_API_KEY,
	);
	// signer for "authenticating" transactions to the contract
	private readonly signer = new ethers.Wallet(process.env.MATIC_PRIVATE_KEY, this.provider);
	// TS instance of the contract ABI
	private readonly contract = new ethers.Contract(this.CONTRACT_ADDRESS, contract.abi, this.signer);

	async mint(address: string) {
		// send transaction to mint token
		const txn: ethers.providers.TransactionResponse = await this.contract.mint(
			address,
			'QmSVP5Tc21YNeJwjWAnWgJrMQaUh6VK6CUfUY51SmSBzcq',
		);
		// wait for transaction to be minted
		await txn.wait();

		return txn;
	}
}
