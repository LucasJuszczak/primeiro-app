import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AuthTokenGuard } from 'src/auth/guard/auth-token.guard';
import { Request } from 'express';


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

    @UseGuards(AuthTokenGuard)
    @Patch(':id')
    updateUser(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateUserDto: UpdateUserDto,
        @Req() req: Request
    ){
        console.log(req['user'])
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id')
    removeUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id)
    }
}