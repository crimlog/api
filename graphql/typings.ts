export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The unique identifier for the student's NFC card */
  CardId: string;
  /** Time (in milliseconds) since the UNIX Epoch */
  Timestamp: number;
};

/** A digital queue that contains [`Students`]({{Types.Student}}). Batch operations can be performed on the queue, such as minting [`AttendanceRecords`]({{Types.AttendanceRecord}}) for all students in the queue. */
export type AttendanceQueue = {
  __typename?: 'AttendanceQueue';
  /** The course the attendance queue is for */
  course: Course;
  /** Unique ID of the queue */
  id: Scalars['ID'];
  status: AttendanceQueueStatus;
  /** A list of [`Students`]({{Types.Student}}) currently in the queue */
  students: Array<Student>;
  /** Creation date of the queue */
  timestamp: Scalars['Timestamp'];
};

/** Input necessary for creating a new [`AttendanceQueue`]({{Types.AttendanceQueue}}) */
export type AttendanceQueueInput = {
  /** [`Course.id`]({{Types.Course}}) */
  courseId: Scalars['ID'];
};

/** Statuses that an [`AttendanceQueue`]({{Types.AttendanceQueue}}) can be in */
export enum AttendanceQueueStatus {
  /** Queue is active and able to accept students */
  Active = 'ACTIVE',
  /** Queue was manually closed without minting */
  Closed = 'CLOSED',
  /** Queue minting is complete and the queue is now closed */
  Complete = 'COMPLETE',
  /** Queue has been deemed invalid by an administrator */
  Invalid = 'INVALID',
  /** Queue minting is in progress */
  Minting = 'MINTING'
}

/** Represents the blockchain transaction of a student attendance record */
export type AttendanceRecord = {
  __typename?: 'AttendanceRecord';
  course: Course;
  id: Scalars['ID'];
  imageURL: Scalars['String'];
  professor: Professor;
  student: Student;
  timestamp: Scalars['Timestamp'];
};

/** A specific university course */
export type Course = {
  __typename?: 'Course';
  /** The course code */
  code: Scalars['String'];
  /** All students enrolled in the course for honors credit */
  honorsStudents: Array<Student>;
  /** Database ID of the course */
  id: Scalars['ID'];
  /** The course name */
  name: Scalars['String'];
  /** The course professor */
  professor: Professor;
  /** All students currently enrolled in the course */
  students: Array<Student>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add a [`Student`]({{Types.Student}}) to an existing [`AttendanceQueue`]({{Types.AttendanceQueue}}) */
  attendanceQueueAddStudent?: Maybe<AttendanceQueue>;
  /** Manually close an [`AttendanceQueue`]({{Types.AttendanceQueue}}) */
  attendanceQueueClose?: Maybe<AttendanceQueue>;
  /** The created [`AttendanceQueue`]({{Types.AttendanceQueue}})'s will be automatically set to `ACTIVE` */
  attendanceQueueCreate?: Maybe<AttendanceQueue>;
  /** Mint an [`AttendanceRecord`]({{Types.AttendanceRecord}}) for all [`Students`]({{Types.Student}}) in an [`AttendanceQueue`]({{Types.AttendanceQueue}}), automatically closing the queue afterewards */
  attendanceQueueMint?: Maybe<Array<Maybe<AttendanceRecord>>>;
  /** Remove a [`Student`]({{Types.Student}}) from an existing [`AttendanceQueue`]({{Types.AttendanceQueue}}) */
  attendanceQueueRemoveStudent?: Maybe<AttendanceQueue>;
  /** Authenticate a [`Professor`]({{Types.Professor}}) through digital signature and receive a JWT response */
  professorLogin?: Maybe<Scalars['String']>;
};


export type MutationAttendanceQueueAddStudentArgs = {
  queueId: Scalars['ID'];
  studentId: Scalars['Int'];
};


export type MutationAttendanceQueueCloseArgs = {
  queueId: Scalars['ID'];
};


export type MutationAttendanceQueueCreateArgs = {
  attendanceQueue: AttendanceQueueInput;
};


export type MutationAttendanceQueueMintArgs = {
  queueId: Scalars['ID'];
};


export type MutationAttendanceQueueRemoveStudentArgs = {
  queueId: Scalars['ID'];
  studentId: Scalars['Int'];
};


export type MutationProfessorLoginArgs = {
  signature: Scalars['String'];
  walletAddress: Scalars['String'];
};

/** A university professor */
export type Professor = {
  __typename?: 'Professor';
  /** First name */
  first: Scalars['String'];
  /** University-specific professor ID number */
  id: Scalars['ID'];
  /** Last name */
  last: Scalars['String'];
  /** Wallet address, used for authentication into the queue */
  walletAddress: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve a single [`AttendanceQueue`]({{Types.AttendanceQueue}}) by ID */
  attendanceQueue?: Maybe<AttendanceQueue>;
  /** Retrieve all [`AttendanceQueues`]({{Types.AttendanceQueue}}) */
  attendanceQueues: Array<Maybe<AttendanceQueue>>;
  /** Retrieve a single [`AttendanceRecord`]({{Types.AttendanceRecord}}) by ID */
  attendanceRecord?: Maybe<AttendanceRecord>;
  /** Retrieve all [`AttendanceRecords`]({{Types.AttendanceRecord}}) */
  attendanceRecords: Array<Maybe<AttendanceRecord>>;
  /** Retrieve a single [`Course`]({{Types.Course}}) by ID */
  course?: Maybe<Course>;
  /** Retrieve all [`Courses`]({{Types.Course}}) */
  courses: Array<Maybe<Course>>;
  /** Retrieve a single [`Professor`]({{Types.Professor}}) by ID */
  professor?: Maybe<Professor>;
  /** Retrieve the unsigned nonce for a [`Professor`]({{Types.Professor}})'s wallet address */
  professorNonce?: Maybe<Scalars['String']>;
  /** Retrieve the currently signed in [`Professor`]({{Types.Professor}}) via the `Authorization` header */
  professorSelf?: Maybe<Professor>;
  /** Retrieve all [`Professors`]({{Types.Professor}}) */
  professors: Array<Maybe<Professor>>;
  /** Retrieve a single [`Student`]({{Types.Student}}) by ID */
  student?: Maybe<Student>;
  /** Retrieve a single [`Student`]({{Types.Student}}) by their [`CardId`]({{Types.CardId}}) */
  studentByCardId?: Maybe<Student>;
  /** Retrieve all [`Students`]({{Types.Student}}) */
  students: Array<Maybe<Student>>;
};


export type QueryAttendanceQueueArgs = {
  id: Scalars['Int'];
};


export type QueryAttendanceRecordArgs = {
  id: Scalars['Int'];
};


export type QueryCourseArgs = {
  id: Scalars['Int'];
};


export type QueryProfessorArgs = {
  id: Scalars['Int'];
};


export type QueryProfessorNonceArgs = {
  walletAddress: Scalars['String'];
};


export type QueryStudentArgs = {
  id: Scalars['Int'];
};


export type QueryStudentByCardIdArgs = {
  cardId: Scalars['CardId'];
};

/** A university student */
export type Student = {
  __typename?: 'Student';
  /** Student's NFC Card uid */
  cardId: Scalars['CardId'];
  /** First name */
  first: Scalars['String'];
  /** University-specific student ID number */
  id: Scalars['Int'];
  /** Last name */
  last: Scalars['String'];
  /** Wallet address */
  walletAddress: Scalars['String'];
};
