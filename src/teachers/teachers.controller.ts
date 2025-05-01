import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger.interceptor';
import { AuthAdminGuard } from 'src/common/guards/admin.guard';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { BodyCreateTeacherInterceptor } from 'src/common/interceptors/body-create-teacher.interceptor';

@Controller('teachers')
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthAdminGuard)
export class TeachersController {
    constructor(private readonly teachersService: TeachersService) {}

    @Get()
    @UseInterceptors(AddHeaderInterceptor)
    findAllTeachers(@Query() paginationDto: PaginationDto){
        return this.teachersService.findAll(paginationDto)
    }

    @Get(':id')
    findOneTeacher(@Param('id', ParseIntPipe) id: number){
        return this.teachersService.findOne(id)
    }

    @Post()
    @UseInterceptors(BodyCreateTeacherInterceptor)
    createTeacher(@Body() createTeacherDto: CreateTeacherDto){
        return this.teachersService.create(createTeacherDto)
    }

    @Patch(':id')
    updateTeacher(@Param('id', ParseIntPipe) id: number, @Body() updateTeacherDto: UpdateTeacherDto){
        return this.teachersService.update(id, updateTeacherDto)
    }

    @Delete(':id')
    removeTeacher(@Param('id', ParseIntPipe) id: number){
        return this.teachersService.delete(id)
    }
}