import { Body, Controller, Post } from '@nestjs/common';
import { GenAiService } from './gen-ai.service';
import { ConfigService } from '@nestjs/config';

@Controller('gen-ai')
export class GenAiController {
  constructor(
    private readonly genAiService: GenAiService,
    private readonly configService: ConfigService,
  ) {}

  @Post('generate-key-results')
  async generateKeyResults(@Body('objective') objective : string): Promise<any> {
    // console.log({ objective });
    // console.log(this.configService.get<string>('MODEL'));
    return await this.genAiService.generateKeyResults(objective);
  }
}
