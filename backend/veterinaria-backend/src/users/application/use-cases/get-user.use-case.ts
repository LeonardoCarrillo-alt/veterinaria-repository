import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/domain/entities/user.entity';
import {
  USER_REPOSITORY_PORT,
  UserRepositoryPort,
} from '../ports/user.repository.port';
import { UserId } from 'src/users/domain/value-objects/user-id.vo';

export interface GetUserDto {
  id: string;
}

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT) private userRepository: UserRepositoryPort,
  ) {}

  async execute(dto: GetUserDto): Promise<User> {
    const user = await this.userRepository.findById(new UserId(dto.id));
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  }
}
