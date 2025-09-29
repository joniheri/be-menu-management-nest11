import { Test, TestingModule } from '@nestjs/testing';
import { UserDummyService } from './user-dummy.service';

describe('UserDummyService', () => {
  let service: UserDummyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserDummyService],
    }).compile();

    service = module.get<UserDummyService>(UserDummyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
