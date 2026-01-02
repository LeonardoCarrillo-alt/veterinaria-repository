import { User } from 'src/modules/users/domain/entities/user.entity';
import { UserId } from 'src/modules/users/domain/value-objects/user-id.vo';

export interface UserRepositoryPort {
  save(user: User): Promise<User>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  delete(id: UserId): Promise<void>;
}

export const USER_REPOSITORY_PORT = Symbol('USER_REPOSITORY_PORT');
