import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Get()
    findAllTasks(){
        return this.tasksService.findAll();
    }

    @Get()
    findOneTasks(){
        return this.tasksService.findOne();
    }
}