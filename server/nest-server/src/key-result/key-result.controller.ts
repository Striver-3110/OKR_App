import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { KeyResultService } from './key-result.service';

export type UpdateKeyResultDto = CreateKeyResultDto & {
  id: string;
};

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
    console.log(keyResults);
    return this.keyResultService.createAll(keyResults);
  }

  @Get('/by-objective')
  findByObjectiveId(@Body('objectiveId') objectiveId: string) {
    return this.keyResultService.findByObjectiveId(objectiveId);
  }

  @Get('/')
  findAll() {
    return this.keyResultService.findAll();
  }

  @Put('/')
  updateKeyResult(@Body() keyResult: UpdateKeyResultDto) {
    console.log(keyResult);
    return this.keyResultService.updateKeyResult(keyResult);
  }

  @Delete('/')
  delete(@Body('id') keyResultId: string) {
    // console.log({ keyResultId });
    return this.keyResultService.delete(keyResultId);
  }
}
