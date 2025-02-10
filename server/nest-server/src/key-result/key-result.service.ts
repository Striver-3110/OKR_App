import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateKeyResultDto } from './key-result.controller';

@Injectable()
export class KeyResultService {
  constructor(private readonly prismaService: PrismaService) {}

  createAll(keyResults: Omit<UpdateKeyResultDto, 'id'>[]) {
    // console.log(keyResults);
    return this.prismaService.keyResult.createMany({ data: keyResults });
  }

  findAll() {
    return this.prismaService.keyResult.findMany();
  }

  findOne(id: string) {
    return this.prismaService.keyResult.findUnique({
      where: {
        id: id,
      },
    });
  }

  updateKeyResult(keyResult: UpdateKeyResultDto) {
    return this.prismaService.keyResult.update({
      where: { id: keyResult.id },
      data: {
        title: keyResult.title,
        initialValue: keyResult.initialValue,
        currentValue: keyResult.currentValue,
        finalValue: keyResult.finalValue,
        metric: keyResult.metric,
      },
    });
  }

  findByObjectiveId(objectiveId: string) {
    return this.prismaService.keyResult.findMany({
      where: {
        objectiveId: objectiveId,
      },
    });
  }

  delete(keyResultId: string) {
    return this.prismaService.keyResult.delete({
      where: {
        id: keyResultId,
      },
    });
  }
}
