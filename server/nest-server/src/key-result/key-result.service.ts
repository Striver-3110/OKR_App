import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KeyResultService {
  constructor(private readonly prismaService: PrismaService) {}

  create(keyResults) {
    // console.log(keyResults);
    return this.prismaService.keyResult.createMany({ data: keyResults });
  }

  findAll() {
    return this.prismaService.keyResult.findMany();
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
