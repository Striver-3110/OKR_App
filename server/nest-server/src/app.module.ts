import { Module } from '@nestjs/common';
import { ObjectiveModule } from './objective/objective.module';
import { PrismaModule } from './prisma/prisma.module';
import { KeyResultService } from './key-result/key-result.service';
import { KeyResultModule } from './key-result/key-result.module';

@Module({
  controllers: [],
  imports: [ObjectiveModule, PrismaModule, KeyResultModule],
  providers: [],
})
export class AppModule {}
