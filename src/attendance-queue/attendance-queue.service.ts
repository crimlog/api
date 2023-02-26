import { Injectable } from '@nestjs/common';
import { AttendanceQueueInput } from '../../graphql/typings';
import { PrismaService } from '../../prisma/prisma.service';
import { attendanceQueueInclude } from '../prisma-query-types';

@Injectable()
export class AttendanceQueueService {
	constructor(private prisma: PrismaService) {}

	findAll(include = attendanceQueueInclude) {
		return this.prisma.attendanceQueue.findMany({ include });
	}

	findOne(id: string, include = attendanceQueueInclude) {
		return this.prisma.attendanceQueue.findUnique({ where: { id }, include });
	}

	attendanceQueueByCourseId(courseId: string, include = attendanceQueueInclude) {
		return this.prisma.attendanceQueue.findFirst({
			where: { courseId, status: 'ACTIVE' },
			include,
		});
	}

	async attendanceQueueCreate(
		attendanceQueue: AttendanceQueueInput,
		include = attendanceQueueInclude,
	) {
		// retrieve queue for validation
		const queue = await this.prisma.attendanceQueue.findFirst({
			where: { ...attendanceQueue, status: 'ACTIVE' },
			select: { id: true },
		});

		// check for existing queue
		if (!!queue)
			throw new Error(`An active queue for this course already exists with ID ${queue.id}`);

		return this.prisma.attendanceQueue.create({
			data: {
				...attendanceQueue,
				status: 'ACTIVE',
				timestamp: Date.now(),
			},
			include,
		});
	}

	async attendanceQueueAddStudent(
		queueId: string,
		studentId: number,
		include = attendanceQueueInclude,
	) {
		// retrieve queue for validation
		const queue = await this.prisma.attendanceQueue.findUnique({
			where: { id: queueId },
			select: { studentIds: true, status: true },
		});

		// check if queue exists
		if (!queue) throw new Error(`Queue ${queueId} does not exist`);
		// check if queue is active
		if (queue.status !== 'ACTIVE') throw new Error(`Queue ${queueId} is not ACTIVE`);
		// check if student is already in queue
		if (queue.studentIds.includes(studentId))
			throw new Error(`Student ${studentId} is already in queue ${queueId}`);

		return this.prisma.attendanceQueue.update({
			where: { id: queueId },
			data: {
				studentIds: { push: studentId },
			},
			include,
		});
	}

	async attendanceQueueRemoveStudent(
		queueId: string,
		studentId: number,
		include = attendanceQueueInclude,
	) {
		// retrieve queue for validation
		const queue = await this.prisma.attendanceQueue.findUnique({
			where: { id: queueId },
			select: { studentIds: true, status: true },
		});

		// check if queue exists
		if (!queue) throw new Error(`Queue ${queueId} does not exist`);
		// check if queue is active
		if (queue.status !== 'ACTIVE') throw new Error(`Queue ${queueId} is not ACTIVE`);
		// check if student is already in queue
		if (!queue.studentIds.includes(studentId))
			throw new Error(`Student ${studentId} is not in queue ${queueId}`);

		return this.prisma.attendanceQueue.update({
			where: { id: queueId },
			data: {
				studentIds: { set: queue.studentIds.filter((id) => id !== studentId) },
			},
			include,
		});
	}

	async attendanceQueueClose(queueId: string, include = attendanceQueueInclude) {
		// retrieve queue for validation
		const queue = await this.prisma.attendanceQueue.findUnique({
			where: { id: queueId },
			select: { status: true },
		});

		// check if queue exists
		if (!queue) throw new Error(`Queue ${queueId} does not exist`);
		// check if queue is active
		if (queue.status === 'CLOSED') throw new Error(`Queue ${queueId} is already closed`);

		return this.prisma.attendanceQueue.update({
			where: { id: queueId },
			data: {
				status: 'CLOSED',
			},
			include,
		});
	}

	attendanceQueueMint(queueId: string, include = attendanceQueueInclude) {
		// set queue status to MINTING before minting begins
		// set queue status to COMPLETE after minting is complete

		throw new Error('This method is unsupported');
	}
}
