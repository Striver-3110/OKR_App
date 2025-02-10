import { Injectable } from '@nestjs/common';
import { AzureChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GenAiService {
  constructor(private readonly configService: ConfigService) {}

  async generateKeyResults(objective: string): Promise<any> {
    const keyResultSchema = z.object({
      keyResults: z.array(
        z.object({
          title: z.string(),
          initialValue: z.number(),
          currentValue: z.number(),
          finalValue: z.number(),
          metric: z.string(),
        }),
      ),
    });

    const model = new AzureChatOpenAI({
      temperature: 0,
      azureOpenAIApiInstanceName: this.configService.get<string>(
        'MODEL_INSTANCE_NAME',
      ),
      azureOpenAIApiDeploymentName:
        this.configService.get<string>('MODEL_NAME'),
      maxTokens: 1000,
      azureOpenAIApiKey: this.configService.get<string>('CHAT_API_KEY'),
      model: this.configService.get<string>('MODEL'),
      azureOpenAIApiVersion: this.configService.get<string>('API_VERSION'),
    });

    const modelWithStructuredOutput =
      model.withStructuredOutput(keyResultSchema);

    const generateKeyResultsPrompt = ChatPromptTemplate.fromMessages([
      {
        role: 'system',
        content: `###CONTEXT###:
     ###INSTRUCTIONS###:
      - Generate most relevant 2-3 key results based on the objective provided, 
      - Also modify the objective in meaningful manner, 
      - If applicable, Ensure that all answers are factually-based on the given input.
    `,
      },
      {
        role: 'user',
        content: `Objective is : ${objective}`,
      },
    ]);

    const chain = generateKeyResultsPrompt.pipe(modelWithStructuredOutput);

    const kerResultsResponse = await chain.invoke({});
    // console.log(kerResultsResponse);
    return kerResultsResponse;

    // const response = await model.invoke([
    //   {
    //     role: 'system',
    //     content: `###CONTEXT###:
    //  ###INSTRUCTIONS###:
    //   - Generate most relevant key results based on the objective provided,
    //   - Also modify the objective in meaningful manner,
    //   - If applicable, Ensure that all answers are factually-based on the given input.
    // `,
    //   },
    //   {
    //     role: 'user',
    //     content: `Objective is : ${objective}`,
    //   },
    // ]);
    // console.log(response.content);
  }
}
