import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { LlmModule } from '../modules/llm-module/llm.module';
import { AiConfigModule } from '../core/ai/ai-config.module';

@Module({
  imports: [LlmModule, AiConfigModule],
  controllers: [AiController],
})
export class AiModule {}
