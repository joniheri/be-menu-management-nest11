import { Module } from '@nestjs/common';
import { UserDummyController } from './user-dummy.controller';
import { UserDummyService } from './user-dummy.service';

@Module({
  controllers: [UserDummyController],
  providers: [UserDummyService]
})
export class UserDummyModule {}
