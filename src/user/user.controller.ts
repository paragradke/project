import { Controller, Get, Post, Body, Param, Put, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserConnectionDTO } from './user.dto';

@Controller('user')
export class UserController {

  constructor(private userService: UserService){
  }

  @Get()
  getAllUser() {
    return this.userService.getAllUser()
  }


  @Post()
  createUser(@Body() data: UserDTO) {
    console.log(data)
    return this.userService.createUser(data)
  }

  @Get(':id')
  getUser(@Param('id', new ParseUUIDPipe()) id: string) {
    console.log(id);
    return this.userService.getUser(id);
  }

  @Put(':id')
  addConnection(@Param('id', new ParseUUIDPipe()) id: string, @Body() data: UserConnectionDTO) {
    return this.userService.addConnection(id, data);
  }
}
