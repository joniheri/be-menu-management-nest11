import { Test, TestingModule } from '@nestjs/testing';
import { UserDummyController } from './user-dummy.controller';

describe('UserDummyController', () => {
  let controller: UserDummyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserDummyController],
    }).compile();

    controller = module.get<UserDummyController>(UserDummyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
