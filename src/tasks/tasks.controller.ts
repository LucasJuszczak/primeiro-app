import { Controller, Get } from "@nestjs/common";


@Controller()
export class TasksController {

    @Get()
    findAllTasks(){
        return "Listando todas as tarefas!"
    }
}