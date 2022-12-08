import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceRecordResolver } from './attendance-record.resolver';
import { AttendanceRecordService } from './attendance-record.service';

describe('AttendanceRecordResolver', () => {
  let resolver: AttendanceRecordResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendanceRecordResolver, AttendanceRecordService],
    }).compile();

    resolver = module.get<AttendanceRecordResolver>(AttendanceRecordResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
