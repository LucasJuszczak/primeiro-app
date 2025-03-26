import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    findAllTasks(@Query('limit') limit: string){
        console.log(limit)
        return this.tasksService.findAll()
    }

    @Get(':id')
    findOneTask(@Param('id') id: string){
        return this.tasksService.findOne(id)
    }

    @Post()
    createTask(@Body() body: any){
        return this.tasksService.create(body)
    }

    @Patch(':id')
    updateTask(@Param('id') id: string, @Body() body: any){
        return this.tasksService.update(id, body)
    }

    @Delete(':id')
    removeTask(@Param('id') id: string){
        return this.tasksService.remove(id)
    }
}