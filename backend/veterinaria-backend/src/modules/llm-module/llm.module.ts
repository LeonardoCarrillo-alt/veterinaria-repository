/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { LLM_MODULE_TOKEN } from './tokens';
import { GeminiAdapter } from './infrastructure/adapter/gemini.adapter';

const implProvider = {
  provide: LLM_MODULE_TOKEN,
  useClass: (() => {
    const provider = process.env.LLM_PROVIDER?.toLowerCase();

    if (provider === 'gemini') {
      return require('./infrastructure/adapters/gemini.adapter').GeminiAdapter;
    }
    return GeminiAdapter;
  })(),
};

@Module({
  providers: [implProvider],
  exports: [LLM_MODULE_TOKEN],
})
export class LlmModule {}
