import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/users/domain/entities/user.entity';
import {
  USER_REPOSITORY_PORT,
  UserRepositoryPort,
} from '../ports/user.repository.port';
import { Email } from 'src/modules/users/domain/value-objects/email.vo';

export interface CreateUserDto {
  username: string;
  name: string;
  password: string;
  email: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT) private userRepository: UserRepositoryPort,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = User.create(
      new Email(dto.email),
      dto.username,
      dto.name,
      hashedPassword,
    );
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }
}
