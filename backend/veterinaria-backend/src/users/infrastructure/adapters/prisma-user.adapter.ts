import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'src/users/application/ports/user.repository.port';
import { User } from 'src/users/domain/entities/user.entity';
import { UserId } from 'src/users/domain/value-objects/user-id.vo';
import { Email } from 'src/users/domain/value-objects/email.vo';
import { PrismaService } from 'src/prisma/prisma.service';

interface PrismaUser {
  id: number;
  email: string;
  username: string;
  name: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class PrismaUserAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<User> {
    const prismaUser = await this.prisma.user.create({
      data: {
        email: user.getEmail().getEmail(),
        username: user.getUsername(),
        name: user.getName(),
        password: user.getPassword(),
        createdAt: user.getCreatedAt(),
        updatedAt: user.getUpdatedAt(),
      },
    });

    return this.mapToDomain(prismaUser);
  }

  async findById(id: UserId): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: parseInt(id.getValue()) },
    });

    return user ? this.mapToDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user ? this.mapToDomain(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.mapToDomain(user));
  }

  async delete(id: UserId): Promise<void> {
    await this.prisma.user.delete({
      where: { id: parseInt(id.getValue()) },
    });
  }

  private mapToDomain(prismaUser: PrismaUser): User {
    return new User(
      new UserId(prismaUser.id.toString()),
      new Email(prismaUser.email),
      prismaUser.username,
      prismaUser.name || '',
      prismaUser.password,
      prismaUser.createdAt,
      prismaUser.updatedAt,
    );
  }
}
