import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/presentation/users.module';
import { AiConfigService } from './core/ai/ai.config';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [PrismaModule, UsersModule, AiModule],
  controllers: [AppController],
  providers: [AppService, AiConfigService],
})
export class AppModule {}
