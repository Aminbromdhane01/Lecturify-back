import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateUserDto } from '@app/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/modules/user/dto/update-user.dto';
import {
  IUserService,
  USER_SERVICE,
} from '@app/modules/user/interfaces/user.service.interface';

@Controller('user')
export class UserController {
  @Inject(USER_SERVICE)
  private readonly userService: IUserService;

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async findAll() {
    return this.userService.findAllusers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findUserbyid(id);
  }
  @Get('findemail/:email')
  async findOneByEmail(@Param('email') email: string) {
    return this.userService.findUserbyemail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
