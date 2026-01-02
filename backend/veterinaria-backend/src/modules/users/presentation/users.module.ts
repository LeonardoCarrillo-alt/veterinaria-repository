import { Module } from '@nestjs/common';
import { UsersService } from '../users.service';
import { UsersController } from './users.controller';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import { LoginUserUseCase } from '../application/use-cases/login-user.use-case';
import { PrismaUserAdapter } from '../infrastructure/adapters/prisma-user.adapter';
import { USER_REPOSITORY_PORT } from '../application/ports/user.repository.port';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [
    UsersService,
    CreateUserUseCase,
    GetUserUseCase,
    LoginUserUseCase,
    PrismaService,
    { provide: USER_REPOSITORY_PORT, useClass: PrismaUserAdapter },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
