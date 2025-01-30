import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

class CreateObjectiveDto {
  title: string;
}

@Injectable()
export class ObjectiveService {
  constructor(private readonly prismaService: PrismaService) {}

  create(objective: CreateObjectiveDto) {
    return this.prismaService.objective.create({ data: objective });
  }

  getAll() {
    return this.prismaService.objective.findMany({
      include: {
        key_result: true,
      },
    });
  }

  delete(objectiveId: string) {
    console.log(objectiveId);
    return this.prismaService.objective.delete({
      where: {
        id: objectiveId,
      },
    });
  }
}
