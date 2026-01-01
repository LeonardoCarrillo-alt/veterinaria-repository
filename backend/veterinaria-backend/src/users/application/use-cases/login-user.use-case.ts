import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  USER_REPOSITORY_PORT,
  UserRepositoryPort,
} from '../ports/user.repository.port';

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    username: string;
    name: string;
  };
  message: string;
}

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_PORT) private userRepository: UserRepositoryPort,
    private jwtService: JwtService,
  ) {}

  async execute(dto: LoginUserDto): Promise<LoginResponse> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    if (user.getPassword() !== dto.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.getId().getValue(),
      username: user.getUsername(),
      email: user.getEmail().getEmail(),
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.getId().getValue(),
        email: user.getEmail().getEmail(),
        username: user.getUsername(),
        name: user.getName(),
      },
      message: 'Login exitoso',
    };
  }
}
