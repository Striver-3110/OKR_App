import { Module } from '@nestjs/common';
import { KeyResultController } from './key-result.controller';
import { KeyResultService } from './key-result.service';

@Module({
  controllers: [KeyResultController],
  providers: [KeyResultService],
})
export class KeyResultModule {}
