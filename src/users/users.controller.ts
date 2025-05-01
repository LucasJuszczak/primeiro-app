import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    findAllUsers(@Query() paginationDto: PaginationDto){
        return this.usersService.findAll(paginationDto)
    }

    @Get(':id')
    findOneUser(@Param('id', ParseIntPipe) id: number){
        return 'Buscando o usuário de id: ' + id
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto)
    }

    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto){
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id')
    removeUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id)
    }
}