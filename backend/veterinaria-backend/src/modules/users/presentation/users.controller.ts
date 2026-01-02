import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  CreateUserDto,
  CreateUserUseCase,
} from '../application/use-cases/create-user.use-case';
import { User } from '../domain/entities/user.entity';
import { GetUserUseCase } from '../application/use-cases/get-user.use-case';
import {
  LoginUserDto,
  LoginUserUseCase,
} from '../application/use-cases/login-user.use-case';

@Controller('users')
export class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post()
  async create(@Body() request: CreateUserDto) {
    const user = await this.createUserUseCase.execute(request);
    return this.mapUserToResponse(user);
  }
  @Get(':id')
  async getbyId(@Param('id') id: string) {
    const user = await this.getUserUseCase.execute({ id });
    return this.mapUserToResponse(user);
  }

  @Post('login')
  async login(@Body() request: LoginUserDto) {
    const result = await this.loginUserUseCase.execute(request);
    return {
      ...result,
      user: {
        id: result.user.id,
        email: result.user.email,
        username: result.user.username,
        name: result.user.name,
      },
    };
  }

  private mapUserToResponse(user: User) {
    return {
      id: user.getId().getValue(),
      email: user.getEmail().getEmail(),
      username: user.getUsername(),
      name: user.getName(),
      password: user.getPassword(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
      accountAge: user.getAccountAge(),
    };
  }
}
