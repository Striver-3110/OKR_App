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
    // console.log(objective);
    return this.objectiveService.create(objective);
  }

  @Get('/')
  getAll() {
    return this.objectiveService.getAll();
  }

  @Delete('/')
  delete(@Body('objectiveId') objectiveId: string) {
    // console.log(objectiveId);
    return this.objectiveService.delete(objectiveId);
  }

  @Put('/')
  put(@Body('id') id: string, @Body('title') title: string) {
    console.log(id, title);
    return this.objectiveService.put(id, title);
  }
}
