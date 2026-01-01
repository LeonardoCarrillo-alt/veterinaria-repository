/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
export class Email {
  private readonly value: string;
  constructor(email: string) {
    if (!this.isValid(email)) {
      throw new Error('invalid email format');
    }
    this.value = email;
  }
  private isValid(email: string): boolean {
    return email.includes('@');
  }
  getEmail(): string {
    return this.value;
  }
  equals(other: Email) {
    return this.value === other.value;
  }
}
