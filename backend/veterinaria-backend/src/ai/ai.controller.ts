/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import { Controller, Post, Body, Inject } from '@nestjs/common';
import { LLM_MODULE_TOKEN } from '../modules/llm-module/tokens';
import {
  LlmPort,
  LlmGenOptions,
} from '../modules/llm-module/domain/ports/llm.port';
import { AiConfigService } from '../core/ai/ai.config';

export interface AiRequestDto {
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatRequestDto {
  messages: Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
  }>;
  temperature?: number;
  maxTokens?: number;
}

@Controller('ai')
export class AiController {
  constructor(
    @Inject(LLM_MODULE_TOKEN) private readonly llmService: LlmPort,
    private readonly aiConfig: AiConfigService,
  ) {}

  @Post('complete')
  async complete(@Body() request: AiRequestDto) {
    const options: LlmGenOptions = {
      model: {
        provider: 'gemini',
        name: this.aiConfig.model,
      },
      temperature: request.temperature ?? this.aiConfig.temperature,
      maxTokens: request.maxTokens ?? this.aiConfig.maxOutputTokens,
    };

    const result = await this.llmService.complete(request.prompt, options);
    return {
      text: result.text,
      tokens: result.tokens,
      raw: result.raw,
    };
  }

  @Post('chat')
  async chat(@Body() request: ChatRequestDto) {
    const options: LlmGenOptions = {
      model: {
        provider: 'gemini',
        name: this.aiConfig.model,
      },
      temperature: request.temperature ?? this.aiConfig.temperature,
      maxTokens: request.maxTokens ?? this.aiConfig.maxOutputTokens,
    };

    const result = await this.llmService.chat(request.messages, options);
    return {
      text: result.text,
      tokens: result.tokens,
      raw: result.raw,
    };
  }
}
