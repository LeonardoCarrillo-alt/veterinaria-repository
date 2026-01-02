import { Module } from '@nestjs/common';
import { AiConfigService } from './ai.config';

@Module({
  providers: [AiConfigService],
  exports: [AiConfigService],
})
export class AiConfigModule {}
