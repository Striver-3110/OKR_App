import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ObjectiveService } from './objective.service';

class CreateObjectiveDto {
  title: string;
}

@Controller('objective')
export class ObjectiveController {
  constructor(private readonly objectiveService: ObjectiveService) {}

  @Post('/')
  create(@Body() objective: CreateObjectiveDto) {
    return this.objectiveService.create(objective);
  }

  @Get('/')
  getAll() {
    return this.objectiveService.getAll();
  }

  @Delete('/')
  delete(@Body('objectiveId') objectiveId: string) {
    return this.objectiveService.delete(objectiveId);
  }

  @Put('/')
    return this.objectiveService.put(id, title);
  }
}
