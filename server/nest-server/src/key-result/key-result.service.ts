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

  async findOne(id: string) {
    const keyResult = await this.prismaService.keyResult.findUnique({
      where: {
        id: id,
      },
    });
    if (!keyResult) throw new Error('key Result Not found');
    return keyResult;
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

  async progress(keyResultId: string): Promise<{ percentage: number }> {
    const keyResult = await this.findOne(keyResultId);
    const percentage = (keyResult.currentValue / keyResult.finalValue) * 100;
    const roundedPercentage = parseFloat(percentage.toFixed(2));
    return { percentage: roundedPercentage };
  }
}
