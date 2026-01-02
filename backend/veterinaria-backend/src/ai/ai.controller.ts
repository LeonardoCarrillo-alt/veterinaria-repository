/* eslint-disable @typescript-eslint/require-await */
import { Controller, Post, Body, Get, Inject } from '@nestjs/common';
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

  @Get('health')
  async health() {
    // Probar una consulta simple para verificar que la API funciona
    const options: LlmGenOptions = {
      model: {
        provider: 'gemini',
        name: 'gemini-2.0-flash-001',
      },
      temperature: 0.1,
      maxTokens: 5,
    };

    try {
      const result = await this.llmService.complete('OK', options);
      return {
        status: 'healthy',
        response: result.text.trim(),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('models')
  async listModels() {
    try {
      // Intentar obtener los modelos disponibles directamente de la API de Google
      const apiKey = this.aiConfig.apiKey;
      if (!apiKey) {
        throw new Error('API key no configurada. Define GEMINI_API_KEY en .env');
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error al obtener modelos: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const availableModels = data.models?.map((model: any) => model.name) || [];

      return {
        available: availableModels,
        default: this.aiConfig.model,
        api_version: 'v1beta',
        timestamp: new Date().toISOString(),
        direct_api_response: data,
      };
    } catch (error) {
      // Si falla la llamada directa, mostrar modelos comunes como fallback
      const commonModels = [
        'gemini-pro',
        'gemini-pro-vision',
        'gemini-1.0-pro',
        'gemini-1.0-pro-vision',
        'gemini-1.5-pro',
        'gemini-1.5-flash',
        'gemini-2.0-flash',
        'gemini-2.0-flash-thinking-exp',
        'gemini-2.5-flash',
        'gemini-2.5-pro',
        'embedding-001',
        'text-embedding-004',
      ];

      return {
        available: commonModels,
        default: this.aiConfig.model,
        error: (error as Error).message,
        recommendation: 'No se pudieron obtener modelos de la API. Probando con lista común.',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
