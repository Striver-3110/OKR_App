import { Module } from '@nestjs/common';
import { GenAiController } from './gen-ai.controller';
import { GenAiService } from './gen-ai.service';

@Module({
  controllers: [GenAiController],
  providers: [GenAiService],
})
export class GenAiModule {}
