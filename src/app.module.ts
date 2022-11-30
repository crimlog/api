import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
	ApolloServerPluginLandingPageLocalDefault,
	ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: false,
			plugins: [
				// Install a landing page plugin based on NODE_ENV
				process.env.NODE_ENV === 'production'
					? ApolloServerPluginLandingPageProductionDefault({
							footer: false,
					  })
					: ApolloServerPluginLandingPageLocalDefault(),
			],
			typePaths: ['./**/*/*.graphql'],
			// so, this lets us leverage the root-level "errors" property returned in the response json
			// (on the same level as data)
			formatError: (error: GraphQLError) => {
				const graphQLFormattedError: GraphQLFormattedError = {
					message: error.extensions?.exception?.code || error.message,
					path: error.path,
				};
				return graphQLFormattedError;
			},
		}),
		PrismaModule,
	],
})
export class AppModule {}
