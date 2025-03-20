import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {

    @Get()
    findAllTasks(){
        return "Listando todas as tarefas!"
    }

}
