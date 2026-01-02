import { Email } from '../value-objects/email.vo';
import { UserId } from '../value-objects/user-id.vo';

export class User {
  constructor(
    private readonly id: UserId,
    private email: Email,
    private readonly username: string,
    private name: string,
    private readonly password: string,
    private readonly createdAt: Date,
    private updatedAt: Date,
  ) {}

  static create(
    email: Email,
    username: string,
    name: string,
    password: string,
  ) {
    if (!name || name.trim().length < 2) {
      throw new Error('name must be at least 2 characters long');
    }
    if (!password || password.trim().length < 6) {
      throw new Error('password must be at least 6 characters long');
    }
    return new User(
      new UserId(),
      new Email(email.getEmail()),
      username,
      name.trim(),
      password,
      new Date(),
      new Date(),
    );
  }
  getId(): UserId {
    return this.id;
  }
  getEmail(): Email {
    return this.email;
  }
  getUsername(): string {
    return this.username;
  }
  getName(): string {
    return this.name;
  }
  getPassword(): string {
    return this.password;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  updateName(name: string) {
    if (!name || name.trim().length < 2) {
      throw new Error('name must be at least 2 characters long');
    }
    this.name = name;
    this.updatedAt = new Date();
  }
  updateEmail(email: Email) {
    if (!email || !email.getEmail().includes('@')) {
      throw new Error('invalid email format');
    }
    this.email = new Email(email.getEmail());
    this.updatedAt = new Date();
  }
  getAccountAge(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
