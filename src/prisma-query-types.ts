import { Prisma } from '@prisma/client';

/*
  Welcome to typing hell!

  In order to obtain typing intellisense and avoid inferred types,
  this file exports types & related objects that can be used across
  any file without issue.
  To get started, create an includeObject of pseduotype `Prisma.*Include`,
  where `*` is the graphql type of the entity you're working with.
  For example, if I were making types for Room queries (findUnique, findMany, etc),
  I would start with the following code:

  const roomIncludeObject = { roomType: true };

  If this object were typed with Prisma.RoomInclude, it would break code that
  will be written in a few steps. This why it's referred to as a pseduotype.
  The object structure should be the same as the Prisma.RoomInclude type,
  but the type itself is not actually applied to the object.

  Next, create and export an `include` object that will passed directly to
  the `include` property for any Prisma queries. Continuing the Room example,
  the next piece of code will look like:

  export const roomInclude = include<
    Prisma.RoomInclude,
    typeof roomIncludeObject
  >(roomIncludeObject);
  
  The `include<>()` method expects to be passed two type parameters as generics.
  The first type parameter should be the `Prisma.*Include` type of the entity you
  are including; `Prisma.RoomInclude` in this case. The second type parameter should
  be `typeof {X}`, where `X` is the includeObject you created in the previous step.
  There is a third paramter, passed directly into the function, and it should be
  the includeObject that was created in the previous step- the object this time,
  and not the type.

  This export will passed directly into Prisma queries (usually at the service level).
*/

// reverse-engineered from Prisma.validator<>() types
const include = <V, S>(t: Prisma.Exact<S, V>) => Prisma.validator<V>()<S>(t);

// adapted from https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types#solution-1
export type InferParent<Service extends { findOne: (id: number) => Promise<unknown> }> =
	Prisma.PromiseReturnType<Service['findOne']>;

// Student
const studentIncludeObject = {
	courses: true,
	honorsCourses: true,
	attendanceRecords: true,
	attendanceQueues: true,
};
export const studentInclude = include<Prisma.StudentInclude, typeof studentIncludeObject>(
	studentIncludeObject,
);

// Professor
const professorIncludeObject = {
	courses: true,
	attendanceRecords: true,
};
export const professorInclude = include<Prisma.ProfessorInclude, typeof professorIncludeObject>(
	professorIncludeObject,
);

// Course
const courseIncludeObject = {
	professor: true,
	students: true,
	honorsStudents: true,
	attendanceRecords: true,
	attendanceQueues: true,
};
export const courseInclude = include<Prisma.CourseInclude, typeof courseIncludeObject>(
	courseIncludeObject,
);

// AttendanceRecord
const attendanceRecordIncludeObject = {
	student: true,
	professor: true,
	course: true,
};
export const attendanceRecordInclude = include<
	Prisma.AttendanceRecordInclude,
	typeof attendanceRecordIncludeObject
>(attendanceRecordIncludeObject);

// AttendanceQueue
const attendanceQueueIncludeObject = {
	students: true,
	course: true,
};
export const attendanceQueueInclude = include<
	Prisma.AttendanceQueueInclude,
	typeof attendanceQueueIncludeObject
>(attendanceQueueIncludeObject);
