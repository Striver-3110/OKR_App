import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { KeyResultService } from './key-result.service';

class CreateKeyResultDto {
  title: string;
  initialValue: number;
  currentValue: number;
  finalValue: number;
  metric: string;
  objectiveId: string;
}

@Controller('key-result')
export class KeyResultController {
  constructor(private readonly keyResultService: KeyResultService) {}

  @Post('/')
  createAll(@Body() keyResults: CreateKeyResultDto[]) {
    // console.log(keyResults);
    return this.keyResultService.createAll(keyResults);
  }

  @Get('/')
  findByObjectiveId(@Body('objectiveId') objectiveId: string) {
    return this.keyResultService.findByObjectiveId(objectiveId);
  }

  @Get('/')
  findMany() {
    return this.keyResultService.findAll();
  }

  @Delete('/')
  delete(@Body('id') keyResultId: string) {
    return this.keyResultService.delete(keyResultId);
  }
}
