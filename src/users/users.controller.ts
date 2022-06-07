import * as common from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';

@common.Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @common.Post()
  async create(
    @common.Body() createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.create(createUserDto);
    return {
      user,
      message: 'Usuária criada com sucesso',
    };
  }

  @common.Get()
  findAll() {
    return this.usersService.findAll();
  }

  @common.Get(':id')
  findOne(@common.Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @common.Patch(':id')
  update(
    @common.Param('id') id: string,
    @common.Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @common.Delete(':id')
  remove(@common.Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
