import { GraphQLClient as _GraphQLClient } from 'graphql-request';
import { PatchedRequestInit } from 'graphql-request/dist/types';

export class GraphQLClient extends _GraphQLClient {
	constructor(url: string, options?: PatchedRequestInit) {
		super(url, {
			//errorPolicy: 'ignore',
			...options,
		});
	}

	async req<T = unknown>(document: string, variables?: Record<string, unknown>): Promise<T> {
		try {
			return await super.request<T>(document, variables);
		} catch (e) {
			return e as T;
		}
	}

	parseObject(obj: Record<string, unknown>) {
		// https://stackoverflow.com/a/65443215/8396479
		return JSON.stringify(obj, null, 2).replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, (match) =>
			match.replace(/"/g, ''),
		);
	}
}
