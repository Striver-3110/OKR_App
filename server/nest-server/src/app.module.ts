import { Module } from '@nestjs/common';
import { ObjectiveModule } from './objective/objective.module';
import { PrismaModule } from './prisma/prisma.module';
import { KeyResultModule } from './key-result/key-result.module';
import { GenAiModule } from './gen-ai/gen-ai.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ObjectiveModule,
    PrismaModule,
    KeyResultModule,
    GenAiModule,
    UserModule,

  ],
  providers: [],
})
export class AppModule {}
