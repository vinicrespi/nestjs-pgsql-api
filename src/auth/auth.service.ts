import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor( 
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  
  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      return await this.usersService.create(createUserDto)
    }
  }

  async signIn(credentialsDto: CredentialsDto) {
    const user = await this.usersService.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }
}
