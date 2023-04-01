import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
	ApolloServerPluginLandingPageLocalDefault,
	ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ObjectIDResolver, TimestampResolver } from 'graphql-scalars';
import { PrismaModule } from '../prisma/prisma.module';
import { AttendanceQueueModule } from './attendance-queue/attendance-queue.module';
import { AttendanceRecordModule } from './attendance-record/attendance-record.module';
import { AuthModule } from './auth/auth.module';
import { ContractModule } from './contracts/contract.module';
import { CourseModule } from './course/course.module';
import { ProfessorModule } from './professor/professor.module';
import { StudentModule } from './student/student.module';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: false,
			plugins: [
				// Install a landing page plugin based on Node environment
				process.env.NODE_ENV === 'production'
					? ApolloServerPluginLandingPageProductionDefault({
							footer: false,
					  })
					: ApolloServerPluginLandingPageLocalDefault(),
			],
			typePaths: ['./**/*/*.graphql'],
			resolvers: {ObjectID: ObjectIDResolver, Timestamp: TimestampResolver},
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
		StudentModule,
		ProfessorModule,
		CourseModule,
		AttendanceRecordModule,
		AttendanceQueueModule,
		AuthModule,
		ContractModule,
	],
})
export class AppModule {}
